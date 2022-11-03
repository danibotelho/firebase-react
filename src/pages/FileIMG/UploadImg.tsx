import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import "./img.css";

type TFile = {
  url: string;
} & File;

export const UploadImage = () => {
  const navigate = useNavigate();
  const [imageUpload, setIimageUpload] = useState<TFile>();
  const [imageList, setImageList] = useState<Array<any>>([]);

  const upload = async (file: TFile): Promise<object | boolean> => {
    const fileName = `${file.name + v4()}`;
    const storageRef = ref(storage, fileName);

    try {
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url: string) => {
          setIimageUpload((prev) => {
            if (prev) prev.url = url;
            return prev;
          });
        });
      });
      return {
        name: file.name,
        storageRefName: fileName,
      };
    } catch (e) {
      return false;
    }
  };

  const handleUpload = (e: TFile) => {
    upload(e);
  };

  const remove = async (nameFile: string): Promise<boolean> => {
    const desertRef = ref(storage, nameFile);

    try {
      await deleteObject(desertRef);
      return true;
    } catch (e) {
      return false;
    }
  };

  const imageListRef = ref(storage, "images/");
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url: string) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <Box sx={{ margin: "30px", padding: "8px", textAlign: "center" }}>
      <TextField
        type="file"
        sx={{ marginTop: "15px" }}
        onChange={(e: any) => {
          setIimageUpload(e.target.files[0]);
        }}
      />
      <Box sx={{ margin: "15px" }}>
        <Button
          type="submit"
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ marginRight: "15px" }}
        >
          Back to Home
        </Button>
        <Button onClick={() => handleUpload} variant="contained">
          Upload Image
        </Button>
      </Box>

      {imageList.map((url: string, index: number) => {
        return <img className="img" src={url} key={index} />;
      })}
    </Box>
  );
};
