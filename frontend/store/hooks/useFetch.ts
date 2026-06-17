import { useState, useEffect, useCallback } from "react";

export default function useFetch(api) {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const data = await api.getItems();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch items.");
    } finally {
      setIsFetching(false);
    }
  }, [api]);

  const addItem = async (item) => {
    setIsAdding(true);
    setError(null);
    try {
      await api.createItem(item);
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item.");
    } finally {
      setIsAdding(false);
    }
  };

  const editItem = async (id, updatedItem) => {
    setIsUpdating(true);
    setError(null);
    try {
      await api.updateItem(id, updatedItem);
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update item.");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (id) => {
    setIsDeleting(true);
    setError(null);
    try {
      await api.deleteItem(id);
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    isLoading: { isFetching, isAdding, isUpdating, isDeleting },
    error,
    fetchItems,
    addItem,
    editItem,
    removeItem,
  };
}
