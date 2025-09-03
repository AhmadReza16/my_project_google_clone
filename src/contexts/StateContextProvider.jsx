import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const StateContext = createContext();
const baseUrl = "https://google-search74.p.rapidapi.com"; // endpoint اصلی

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Log searchTerm changes
  useEffect(() => {
    console.log("SearchTerm changed to:", searchTerm);
  }, [searchTerm]);

  // useCallback باعث میشه هر بار getResults جدید ساخته نشه
  const getResults = useCallback(async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const fullUrl = `${baseUrl}${endpoint}`;
      console.log("Making API request to:", fullUrl); // 🔍 برای دیدن URL کامل

      const res = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2cc830723fmsh663739bcc56255cp13ba7ejsnfddea1cfe648", // 🔑
          "X-RapidAPI-Host": "google-search74.p.rapidapi.com",
        },
      });

      console.log("API Response Status:", res.status); // 🔍 برای دیدن status

      if (!res.ok)
        throw new Error(`Network response was not ok: ${res.status}`);

      const data = await res.json();
      console.log("API Response Data:", data); // 🔍 برای دیدن ساختار جواب

      // بروزرسانی results با توجه به endpoint و ساختار داده
      if (data.results) {
        setResults(data.results);
      } else if (data.entries) {
        setResults(data.entries);
      } else if (data.image_results) {
        setResults(data.image_results);
      } else if (data.organic) {
        setResults(data.organic);
      } else if (data.videos) {
        setResults(data.videos);
      } else if (data.stories) {
        setResults(data.stories);
      } else if (Array.isArray(data)) {
        setResults(data);
      } else {
        console.log("Unexpected data structure:", data);
        setResults([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "خطا در دریافت اطلاعات");
      setResults([]);
    }
    setLoading(false);
  }, []);

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading, error }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
