import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useStateContext } from "../contexts/StateContextProvider.jsx";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (!searchTerm) {
      console.log("No search term provided");
      return;
    }

    console.log("Search term received:", searchTerm, "Path:", location.pathname);

    let endpoint = "";
    if (location.pathname === "/videos") {
      endpoint = `/?query=${searchTerm} videos&num=10`;
    } else if (location.pathname === "/search") {
      endpoint = `/?query=${searchTerm}&num=10`;
    } else if (location.pathname === "/images") {
      endpoint = `/?query=${searchTerm}&num=20`;
    } else if (location.pathname === "/news") {
      endpoint = `/?query=${searchTerm}&num=10`;
    }

    console.log("Calling getResults with endpoint:", endpoint);
    getResults(endpoint);
  }, [searchTerm, location.pathname, getResults]);

  console.log("Rendering Results:", results);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {(Array.isArray(results) ? results : []).map(
            (result, index) => {
              const link = result.link || result.url || result.href;
              const title = result.title || result.name;
              const snippet = result.snippet || result.description;
              
              return (
                <div key={link || index} className="md:w-2/5 w-full">
                  <a href={link} target="_blank" rel="noreferrer">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {link && link.length > 30 ? link.substring(0, 30) + "..." : link}
                    </p>
                    <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                      {title}
                    </p>
                    {snippet && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {snippet}
                      </p>
                    )}
                  </a>
                </div>
              );
            }
          )}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {(Array.isArray(results) ? results : []).map((result, index) => {
            const imageSrc = result.image?.src || result.src || result.url;
            const link = result.link?.href || result.href || result.url;
            const title = result.title || result.alt || "Image";
            
            return (
              <a
                href={link}
                target="_blank"
                key={link || index}
                rel="noreferrer"
                className="sm:p-3 p-5"
              >
                <img 
                  src={imageSrc} 
                  alt={title} 
                  loading="lazy" 
                  className="w-48 h-48 object-cover rounded-lg"
                />
                <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
              </a>
            );
          })}
        </div>
      );
    case "/news":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {(Array.isArray(results) ? results : []).map((result, index) => {
            const link = result.links?.[0]?.href || result.link || result.url;
            const title = result.title || result.headline;
            const source = result.source?.href || result.source || result.publisher;
            const date = result.date || result.published_date;
            
            return (
              <div key={result.id || index} className="md:w-2/5 w-full">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {source && (
                    <span className="hover:underline hover:text-blue-300">
                      {source}
                    </span>
                  )}
                  {date && <span>{date}</span>}
                </div>
              </div>
            );
          })}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {(Array.isArray(results) ? results : []).map((video, index) => {
            const videoUrl = video.additional_links?.[0]?.href || video.url || video.link;
            const title = video.title || video.name;
            
            return (
              <div
                key={videoUrl || index}
                className="p-2"
              >
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="355px"
                  height="200px"
                />
                {title && (
                  <p className="text-sm mt-2 text-center">{title}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    default:
      return "Error...";
  }
};
