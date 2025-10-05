import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { categoryApi } from "../services/api";
import { Layers, Save, X, Plus, Edit } from "lucide-react";
// import { useToast } from "../hooks/use-toast";

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  city,
  editData,
  onSuccess,
}) {
  //   const { toast } = useToast();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editData) {
        // For edit mode, populate all fields including individual image fields
        const editFormData = { ...editData };
        
        // Extract individual image fields from the images array
        if (editData.images && Array.isArray(editData.images)) {
          editFormData.image0 = editData.images[0] || '';
          editFormData.image1 = editData.images[1] || '';
          editFormData.image2 = editData.images[2] || '';
        } else {
          // Fallback if images array doesn't exist
          editFormData.image0 = editData.image0 || '';
          editFormData.image1 = editData.image1 || '';
          editFormData.image2 = editData.image2 || '';
        }
        
        setFormData(editFormData);
      } else {
        // For create mode
        setFormData({
          cityId: city.cityId,
          cityName: city.cityName,
          image0: '',
          image1: '',
          image2: '',
          images: []
        });
      }
    }
  }, [open, editData, city]);

  const getFormFields = () => {
    switch (category) {
      case 'Accommodation':
        return [
          { key: 'hotels', label: 'Hotel Name', type: 'text', required: true },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'minPrice', label: 'Min Price', type: 'text' },
          { key: 'maxPrice', label: 'Max Price', type: 'text' },
          { key: 'roomTypes', label: 'Room Types (comma-separated)', type: 'string' },
          { key: 'facilities', label: 'Facilities (comma-separated)', type: 'string' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'flagShip', label: 'Flagship Property', type: 'checkbox' },
          // { key: 'premium', label: 'Premium', type: 'checkbox' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];
      case 'GeneralCityInfo':
        return [
          { key: 'stateOrUT', label: 'State/UT', type: 'text' },
          { key: 'alternateNames', label: 'Alternate Names (comma-separated)', type: 'array' },
          { key: 'languagesSpoken', label: 'Languages Spoken (comma-separated)', type: 'array' },
          { key: 'climateInfo', label: 'Climate Information', type: 'textarea' },
          { key: 'bestTimeToVisit', label: 'Best Time to Visit', type: 'text' },
          { key: 'cityHistory', label: 'City History', type: 'textarea' },
          { key: 'coverImage', label: 'Cover Image URL', type: 'text' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];
      case 'Activities':
        return [
          { key: 'topActivities', label: 'Top Activities', type: 'text', required: true },
          { key: 'bestPlaces', label: 'Best Places to Visit', type: 'text' },
          { key: 'description', label: 'Activity Description', type: 'textarea' },
          { key: 'essentials', label: 'Travel Essentials', type: 'text' },
          { key: 'fee', label: 'Entry Fee/Cost', type: 'text' },
          { key: 'image0', label: 'Image URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];
      case 'Connectivity':
        return [
          { key: 'nearestAirportStationBusStand', label: 'Nearest Airport/Station/Bus Stand', type: 'text', required: true },
          { key: 'distance', label: 'Distance from City', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'majorFlightsTrainsBuses', label: 'Major Flights/Trains/Buses', type: 'textarea' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];
      case 'Food':
        return [
          { key: 'foodPlace', label: 'Food Place Name', type: 'text', required: true },
          { key: 'flagship', label: 'Flagship Place', type: 'checkbox' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'vegOrNonVeg', label: 'Veg/Non-Veg', type: 'select', options: ['Veg', 'NonVeg', 'Both'] },
          { key: 'valueForMoney', label: 'Value for Money (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'service', label: 'Service Rating (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'taste', label: 'Taste Rating (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'hygiene', label: 'Hygiene Rating (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'menuSpecial', label: 'Menu Specialties', type: 'textarea' },
          { key: 'menuLink', label: 'Menu Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'phone', label: 'Phone Number', type: 'text' },
          { key: 'website', label: 'Website', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      case 'HiddenGems':
        return [
          { key: 'hiddenGem', label: 'Hidden Gem Name', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'establishYear', label: 'Establish Year', type: 'text' },
          { key: 'fee', label: 'Entry Fee', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'essential', label: 'Essentials', type: 'text' },
          { key: 'story', label: 'Story', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      case 'LocalTransport':
        return [
          { key: 'from', label: 'From', type: 'text', required: true },
          { key: 'to', label: 'To', type: 'text', required: true },
          { key: 'autoPrice', label: 'Auto Price', type: 'text' },
          { key: 'cabPrice', label: 'Cab Price', type: 'text' },
          { key: 'bikePrice', label: 'Bike Price', type: 'text' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      case 'NearbyTouristSpots':
        return [
          { key: 'places', label: 'Place Name', type: 'text', required: true },
          { key: 'distance', label: 'Distance', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'establishYear', label: 'Establish Year', type: 'text' },
          { key: 'fee', label: 'Entry Fee', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'essential', label: 'Essentials', type: 'text' },
          { key: 'story', label: 'Story', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      case 'PlacesToVisit':
        return [
          { key: 'places', label: 'Place Name', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'establishYear', label: 'Establish Year', type: 'text' },
          { key: 'fee', label: 'Entry Fee', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'essential', label: 'Essentials', type: 'text' },
          { key: 'story', label: 'Story', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      case 'Shopping':
        return [
          { key: 'shops', label: 'Shop Name', type: 'text', required: true },
          { key: 'flagship', label: 'Flagship Shop', type: 'checkbox' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'famousFor', label: 'Famous For', type: 'text' },
          { key: 'priceRange', label: 'Price Range', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'phone', label: 'Phone', type: 'text' },
          { key: 'website', label: 'Website', type: 'text' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      case 'Miscellaneous':
        return [
          { key: 'localMap', label: 'Local Map Link', type: 'text' },
          { key: 'emergencyContacts', label: 'Emergency Contacts', type: 'text' },
          { key: 'hospital', label: 'Hospital Name', type: 'text' },
          { key: 'hospitalLocationLink', label: 'Hospital Location Link', type: 'text' },
          { key: 'hospitalLat', label: 'Hospital Latitude', type: 'number' },
          { key: 'hospitalLon', label: 'Hospital Longitude', type: 'number' },
          { key: 'PoliceLocationLink', label: 'Police Station Location Link', type: 'text' },
          { key: 'PoliceLat', label: 'Police Station Latitude', type: 'number' },
          { key: 'PoliceLon', label: 'Police Station Longitude', type: 'number' },
          { key: 'parking', label: 'Parking', type: 'text' },
          { key: 'parkingLocationLink', label: 'Parking Location Link', type: 'text' },
          { key: 'parkingLat', label: 'Parking Latitude', type: 'number' },
          { key: 'parkingLon', label: 'Parking Longitude', type: 'number' },
          { key: 'publicWashrooms', label: 'Public Washrooms', type: 'text' },
          { key: 'publicWashroomsLocationLink', label: 'Washrooms Location Link', type: 'text' },
          { key: 'publicWashroomsLat', label: 'Washrooms Latitude', type: 'number' },
          { key: 'publicWashroomsLon', label: 'Washrooms Longitude', type: 'number' },
          { key: 'premium', label: 'Premium', type: 'select', options: ['FREE', 'A', 'B'],default: 'FREE' },
        ];

      default:
        // Generic form for other categories
        return [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'price', label: 'Price', type: 'text' },
          { key: 'rating', label: 'Rating', type: 'number' },
          { key: 'image', label: 'Image URL', type: 'text' },
        ];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Process array fields and JSON-like fields
      const processedData = { ...formData };
      getFormFields().forEach(field => {
        if (field.type === 'array' && typeof processedData[field.key] === 'string') {
          processedData[field.key] = processedData[field.key]
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item);
        }
        if (category === 'Miscellaneous') {
          if (field.key === 'engagement' && typeof processedData.engagement === 'string') {
            try { processedData.engagement = JSON.parse(processedData.engagement); } catch { }
          }
          if (field.key === 'reviews' && typeof processedData.reviews === 'string') {
            try { processedData.reviews = JSON.parse(processedData.reviews); } catch { }
          }
        }
      });

      if (editData && editData._id) {
        await categoryApi.update(category, editData._id, processedData);
        // toast({
        //   title: "Success",
        //   description: "Item updated successfully",
        // });
      } else {
        await categoryApi.create(category, processedData);
        // toast({
        //   title: "Success", 
        //   description: "Item created successfully",
        // });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: `Failed to ${editData ? 'update' : 'create'} item`,
      //     variant: "destructive",
      //   });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const fields = getFormFields();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-white border border-blue-100 shadow-professional">
        <DialogHeader className="space-y-3 pb-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              {editData ? <Edit className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
            </div>
            <div>
              <DialogTitle className="text-xl text-slate-800">
                {editData ? 'Edit' : 'Add'} {category} Entry
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {editData ? 'Update' : 'Create'} {category.toLowerCase()} data for {city.cityName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 max-h-[50vh] overflow-y-auto pr-2">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key} className="text-slate-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>

                {/* {field.type === 'textarea' ? (
                  <Textarea
                    id={field.key}
                    value={formData[field.key] || ''}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    required={field.required}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white min-h-[80px]"
                  />
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                      id={field.key}
                      checked={!!formData[field.key]}
                      onCheckedChange={(checked) => updateFormData(field.key, checked)}
                      className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor={field.key} className="text-sm text-slate-700 cursor-pointer">
                      {field.label}
                    </Label>
                  </div>
                ) : field.type === 'array' ? (
                  <Input
                    id={field.key}
                    value={
                      Array.isArray(formData[field.key])
                        ? formData[field.key].join(', ')
                        : formData[field.key] || ''
                    }
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    placeholder="Separate multiple items with commas"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  />
                ) : (
                  <Input
                    id={field.key}
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    required={field.required}
                    min={field.min}
                    max={field.max}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  />
                )} */}

                {field.type === 'textarea' ? (
  <Textarea
    id={field.key}
    value={formData[field.key] || ''}
    onChange={(e) => updateFormData(field.key, e.target.value)}
    required={field.required}
    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white min-h-[80px]"
  />
) : field.type === 'checkbox' ? (
  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
    <Checkbox
      id={field.key}
      checked={!!formData[field.key]}
      onCheckedChange={(checked) => updateFormData(field.key, checked)}
      className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
    />
    <Label htmlFor={field.key} className="text-sm text-slate-700 cursor-pointer">
      {field.label}
    </Label>
  </div>
) : field.type === 'array' ? (
  <Input
    id={field.key}
    value={
      Array.isArray(formData[field.key])
        ? formData[field.key].join(', ')
        : formData[field.key] || ''
    }
    onChange={(e) => updateFormData(field.key, e.target.value)}
    placeholder="Separate multiple items with commas"
    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
  />
) : field.type === 'select' ? (
  <select
    id={field.key}
    value={formData[field.key] || field.default || ''}
    onChange={(e) => updateFormData(field.key, e.target.value)}
    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-md p-2"
  >
    {field.options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
) : (
  <Input
    id={field.key}
    type={field.type}
    value={formData[field.key] || ''}
    onChange={(e) => updateFormData(field.key, e.target.value)}
    required={field.required}
    min={field.min}
    max={field.max}
    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
  />
)}

              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-blue-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gradient-primary text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : editData ? "Save Changes" : "Create Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}