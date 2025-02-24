import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from "../react-query/mutations/property.mutation";
import {
  useGetPropertiesCategories,
  useGetSingleProperty,
} from "../react-query/queries/property.queries";
import { useGetPropertyTypesQuery } from "../react-query/queries/property.queries";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
import api from "../apis";
import { getImageUrl } from "../utilities/helpers";

const PropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      uploaded_images: undefined,
      title: "",
    },
  });
  const [selectedCategory, setSelectedCategory] = useState();

  const { mutateAsync: createProperty } = useCreatePropertyMutation();
  const { mutateAsync: updateProperty } = useUpdatePropertyMutation(id);
  const { data: categories, isLoading: isLoadingCategories } =
    useGetPropertiesCategories();
  const { data: propertyTypes, isLoading: isLoadingPropertyTypes } =
    useGetPropertyTypesQuery(selectedCategory, !!selectedCategory);
  const { data: existingProperty, isLoading: isLoadingProperty } =
    useGetSingleProperty(id);

  useEffect(() => {
    if (existingProperty) {
      setValue("title", existingProperty.title);
      setValue("description", existingProperty.description);
      setValue("price", existingProperty.price);
      setValue("address", existingProperty.address);
      setValue("latitude", existingProperty.latitude);
      setValue("longitude", existingProperty.longitude);
      setValue("city", existingProperty.city);
      setValue("bedroom", existingProperty.bedroom);
      setValue("washroom", existingProperty.washroom);
      setValue("area", existingProperty.area);
      setValue("property_category", existingProperty.property_category);
      setSelectedCategory(existingProperty.property_category);
      setValue("property_type", existingProperty.property_type);
      setValue("rent_or_buy", existingProperty.rent_or_buy);
    }
  }, [existingProperty, setValue]);

  const onSubmit = async (formData) => {
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "uploaded_images") {
        Array.from(formData[key]).forEach((file) =>
          submitData.append("uploaded_images", file)
        );
      } else {
        submitData.append(key, formData[key]);
      }
    });
    try {
      if (id) {
        await updateProperty({ id, data: submitData });
        toast.success("Property Updated");
        navigate(`/admin/properties/${id}`);
      } else {
        await createProperty(submitData);
        toast.success("Property Created");
        navigate("/admin/properties");
      }
    } catch (error) {
      toast.error(error.message || "Failed to save property");
    }
  };

  const watchCategory = watch("property_category");
  useEffect(() => {
    if (watchCategory && watchCategory !== "Loading...") {
      setSelectedCategory(watchCategory);
      if (watchCategory == 2 || watchCategory == 3) {
        setValue("bedroom", 0);
        setValue("washroom", 0);
      }
    }
  }, [watchCategory]);

  if (isLoadingProperty || isLoadingCategories || isLoadingPropertyTypes) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
          {id ? "Edit Property" : "Add Property"}
        </h1>

        {existingProperty?.images && existingProperty.images.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4">
              {existingProperty.images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={getImageUrl(image.image)}
                    alt="Property"
                    className="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await api.delete(`/api/properties/${id}/delete_image/`, {
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ image_id: image.id }),
                        });
                        queryClient.invalidateQueries(["property", id]);
                        toast.success("Image deleted successfully");
                      } catch (error) {
                        toast.error("Failed to delete image");
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Property Category */}
            <div>
            <label
              htmlFor="property_category"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Property Category
            </label>
            <select
              id="property_category"
              {...register("property_category", {
                defaultValue: 1,
                required: "Property category is required",
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              {isLoadingCategories ? (
                <option>Loading...</option>
              ) : (
                categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            {errors.property_category && (
              <span className="text-red-500 text-sm mt-1">
                {errors.property_category.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="property_type"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Property Type
            </label>
            <select
              id="property_type"
              {...register("property_type", {
                required: "Property type is required",
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-100"
              disabled={!selectedCategory || isLoadingPropertyTypes}
            >
              <option value="">Select a property type</option>
              {isLoadingPropertyTypes ? (
                <option value="">Loading...</option>
              ) : propertyTypes && propertyTypes.length > 0 ? (
                propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              ) : (
                <option value="">No types available</option>
              )}
            </select>
            {errors.property_type && (
              <span className="text-red-500 text-sm mt-1">
                {errors.property_type.message}
              </span>
            )}
          </div>

          {/* Property Images */}
          <div>
            <label
              htmlFor="uploaded_images"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Property Images
            </label>
            <input
              type="file"
              id="uploaded_images"
              accept="image/*"
              multiple
              {...register("uploaded_images")}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            {errors.uploaded_images && (
              <span className="text-red-500 text-sm mt-1">
                {errors.uploaded_images.message}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 200, message: "Max 200 characters" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter property title"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Describe the property"
              rows={6}
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              id="price"
              type="text"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter price"
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address", {
                required: "Address is required",
                maxLength: { value: 255, message: "Max 255 characters" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter address"
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </span>
            )}
          </div>
          {/* latitde */}
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Latitude
            </label>
            <input
              id="latitude"
              type="text"
              {...register("latitude", {
                required: "Latitude is required",
                maxLength: { value: 255, message: "Max 255 characters" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter latitude"
            />
            {errors.latitude && (
              <span className="text-red-500 text-sm mt-1">
                {errors.latitude.message}
              </span>
            )}
          </div>
           {/* longitude */}
           <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Longitude
            </label>
            <input
              id="longitude"
              type="text"
              {...register("longitude", {
                required: "Longitude is required",
                maxLength: { value: 255, message: "Max 255 characters" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter longitude"
            />
            {errors.longitude && (
              <span className="text-red-500 text-sm mt-1">
                {errors.longitude.message}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              {...register("city", {
                required: "City is required",
                maxLength: { value: 255, message: "Max 255 characters" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter city"
            />
            {errors.city && (
              <span className="text-red-500 text-sm mt-1">
                {errors.city.message}
              </span>
            )}
          </div>

        

          {/* Property Type
          <div>
            <label
              htmlFor="property_type"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Property Type
            </label>
            <select
              id="property_type"
              {...register("property_type", {
                required: "Property type is required",
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-100"
              disabled={!selectedCategory}
            >
              {isLoadingPropertyTypes ? (
                <option>Loading...</option>
              ) : (
                propertyTypes &&
                propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
            {errors.property_type && (
              <span className="text-red-500 text-sm mt-1">
                {errors.property_type.message}
              </span>
            )}
          </div> */}

          
          {/* Area */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Area (sqft)
            </label>
            <input
              id="area"
              type="number"
              {...register("area", {
                min: { value: 0, message: "Area must be greater than 0" },
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter area in square feet"
            />
            {errors.area && (
              <span className="text-red-500 text-sm mt-1">
                {errors.area.message}
              </span>
            )}
          </div>

          {/* Bedroom & Washroom */}
          {selectedCategory != 2 && selectedCategory != 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="bedroom"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Bedrooms
                </label>
                <input
                  id="bedroom"
                  type="number"
                  {...register("bedroom", {
                    value: 0,
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                  className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Number of bedrooms"
                />
                {errors.bedroom && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.bedroom.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="washroom"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Washrooms
                </label>
                <input
                  id="washroom"
                  type="number"
                  {...register("washroom", {
                    value: 0,
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                  className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Number of washrooms"
                />
                {errors.washroom && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.washroom.message}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rent or Buy */}
          <div>
            <label
              htmlFor="rent_or_buy"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Rent or Buy
            </label>
            <select
              id="rent_or_buy"
              {...register("rent_or_buy", {
                defaultValue: "buy",
                required: "Please select an option",
              })}
              className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
            {errors.rent_or_buy && (
              <span className="text-red-500 text-sm mt-1">
                {errors.rent_or_buy.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/3 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            >
              {id ? "Update Property" : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;