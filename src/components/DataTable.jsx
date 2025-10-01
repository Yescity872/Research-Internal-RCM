import { useState } from "react";
import { Edit, Trash2, Eye, Database } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { categoryApi } from "../services/api";
// import { useToast } from "../hooks/use-toast";

export function DataTable({ data, category, onEdit, onDataChange }) {
  //   const { toast } = useToast();
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleDelete = async (item) => {
    if (!item._id) return;
    
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      setDeletingIds(prev => new Set(prev).add(item._id));
      await categoryApi.delete(category, item._id);
      //   toast({
      //     title: "Success",
      //     description: "Item deleted successfully",
      //   });
      onDataChange();
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to delete item",
      //     variant: "destructive",
      //   });
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(item._id);
        return next;
      });
    }
  };

  const renderCellValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return String(value || "");
  };

  const getDisplayColumns = () => {
    if (data.length === 0) return [];
    
    const categoryColumns = {
      'Accommodation': ['cityName', 'hotels'],
      'Activities': ['cityName', 'topActivities'],
      'Connectivity': ['cityName', 'nearestAirportStationBusStand'],
      'Food': ['cityName', 'foodPlace'],
      'GeneralCityInfo': ['cityName', 'stateOrUT','alternateNames'],
      'HiddenGems': ['cityName', 'hiddenGem'],
      'LocalTransport': ['cityName', 'from', 'to'],
      'Miscellaneous': ['cityName', 'parking', 'hospital'],
      'NearbyTouristSpots': ['cityName', 'places'],
      'PlacesToVisit': ['cityName', 'places'],
      'Shopping': ['cityName', 'shops']
    };

    const essentialColumns = categoryColumns[category] || ['cityName'];
    const firstItem = data[0];
    
    return essentialColumns.filter(col => col in firstItem);
  };

  if (data.length === 0) {
    return (
      <Card className="shadow-card border border-blue-100 bg-white">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-lg text-slate-800">{category} Data</CardTitle>
          <CardDescription className="text-slate-600">No data found for this category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-600">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50 text-blue-400" />
            <p className="text-slate-700 mb-2">No {category.toLowerCase()} data available</p>
            <p className="text-sm text-blue-600">Use the "Add New" button to create entries</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayColumns = getDisplayColumns();

  return (
    <Card className="shadow-card border border-blue-100 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
        <CardTitle className="text-lg flex items-center gap-3 text-slate-800">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md">
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          {category} Data
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            {data.length} items
          </Badge>
        </CardTitle>
        <CardDescription className="text-slate-600">
          Manage {category.toLowerCase()} entries for the selected city
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 border-b border-blue-100 hover:bg-slate-50">
                {displayColumns.map((column) => (
                  <TableHead key={column} className="text-slate-700 border-r border-blue-100 last:border-r-0">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableHead>
                ))}
                <TableHead className="text-right w-32 text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item._id || index} className="hover:bg-blue-50/50 border-b border-blue-50">
                  {displayColumns.map((column) => (
                    <TableCell key={column} className="max-w-xs border-r border-blue-50 last:border-r-0">
                      <div className="truncate text-slate-700" title={renderCellValue(item[column])}>
                        {renderCellValue(item[column])}
                      </div>
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(item)}
                        className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600 border border-transparent hover:border-blue-200"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item)}
                        disabled={deletingIds.has(item._id || "")}
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 text-slate-500 border border-transparent hover:border-red-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}