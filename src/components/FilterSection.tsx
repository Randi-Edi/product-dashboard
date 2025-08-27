import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useFilter } from "../context/FilterContext";

const FilterSection: React.FC = () => {
  const {
    categories,
    category,
    setCategory,
    products,
    selectedProducts,
    setSelectedProducts,
    loadingCategories,
    loadingProducts,
    clearFilters,
    triggerReport,
    canRunReport,
    loadingReport,
  } = useFilter();

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-2xl flex flex-col p-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button
          variant="text"
          sx={{ textTransform: "none", fontSize: "0.875rem", color: "black" }}
          onClick={clearFilters}
        >
          Clear
        </Button>
      </div>

      {/* Category Select */}
      <div className="mb-4">
        <FormControl fullWidth size="small">
          <InputLabel>Select Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Select Category"
            disabled={loadingCategories}
          >
            {loadingCategories ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>

      {/* Product Select */}
      <div className="mb-4 mb-auto">
        <FormControl
          fullWidth
          size="small"
          disabled={!category || loadingProducts}
        >
          <InputLabel>Select Product</InputLabel>
          <Select
            multiple
            value={selectedProducts}
            onChange={(e) => setSelectedProducts(e.target.value as string[])}
            input={<OutlinedInput label="Select Product" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {loadingProducts ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              products.map((prod) => (
                <MenuItem key={prod.id} value={prod.title}>
                  <Checkbox checked={selectedProducts.includes(prod.title)} />
                  <ListItemText primary={prod.title} />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>

      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
        onClick={triggerReport}
        disabled={!canRunReport || loadingReport} // Add loadingReport to disabled condition
      >
        {loadingReport ? <CircularProgress size={24} /> : "Run Report"}
      </Button>
    </div>
  );
};

export default FilterSection;
