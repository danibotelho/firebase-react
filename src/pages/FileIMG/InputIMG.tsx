import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import { storage } from "../../firebase/config/firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";
import "./img.css";

type TFile = {
  url: string;
} & File;

type TImage = {
  name: string;
  url: string;
};

export const InputIMG = () => {
  const [imageUpload, setImageUpload] = useState<TFile>();
  const [imageList, setImageList] = useState<Array<TImage>>([]);

  const navigate = useNavigate();

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload?.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(snapshot.metadata.ref);
        setImageList((prev) => [
          ...prev,
          { url, name: snapshot.metadata.name },
        ]);
      });
      alert("upload successfully");
    });
  };

  const remove = (refName: string) => {
    const desertRef = ref(storage, `images/${refName}`);
    if (desertRef == null) return;
    deleteObject(desertRef)
      .then(() => {
        const newImagaList = imageList.filter(
          (image) => image.name !== refName
        );
        setImageList(newImagaList);
        alert("sucessfully removed");
      })

      .catch((error) => {
        alert(error);
      });
  };

  const imagesListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, { url, name: item.name }]);
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
          setImageUpload(e.target.files[0]);
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
        <Button onClick={uploadFile} variant="contained">
          Upload Image
        </Button>
      </Box>
      <Box
        sx={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <ImageList
          sx={{ width: 500, height: 450 }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {imageList.map((img, index: number) => (
            <ImageListItem key={index}>
              <img src={img.url} alt={"texto"} loading="lazy" />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => remove(img.name)}
                  >
                    <ClearIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};
