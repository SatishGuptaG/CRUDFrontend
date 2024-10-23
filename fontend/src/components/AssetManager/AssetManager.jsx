import React, { useState, useEffect } from "react";
import FolderTree from "./FolderTree";
import FileViewer from "./FileViewer";

const AssetManager = ({onFileSelect }) => {
  const [selectedFolder, setSelectedFolder] = useState("Home"); //bydefault set home

  const handleFolderSelect = (folderPath) => {
    console.log("AssetManager Selected Folder:", folderPath);
    setSelectedFolder(folderPath);
  };

  useEffect(() => {
    console.log("Updated Selected Folder:", selectedFolder);
  }, [selectedFolder]);

  const handleFileSelect = (fileDetails) => {
    // Callback to parent to pass file details
    onFileSelect(fileDetails);
  };
  return (
    <div className="flex h-screen bg-background">
      <div className="w-1/4 border-r p-4">
        <FolderTree onSelectFolder={handleFolderSelect} />
      </div>
      <div className="w-2/3 p-4">
        <FileViewer selectedFolder={selectedFolder} onFileSelect={handleFileSelect}  />
      </div>
    </div>
  );
};

export default AssetManager;
