import React, { useState } from "react";
import { firestore } from "../../firebase/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";
import {
  Box,
  Button,
} from "@mui/material";

export const Home = () => {
  const ref = collection(firestore, "messages");
  const [body, setBody] = useState("");

  const handleSaveEditor = (e: any) => {
    e.preventDefault();

    let data = {
      message: body,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Box>
        <Editor
          textareaName="content"
          initialValue=""
          onEditorChange={(newText) => {
            setBody(newText);
          }}
          init={{
            height: 400,
            menubar: false,
            plugins:
              "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",

            toolbar: [
              "|bold italic underline forecolor backcolor removeformat| fontselect fontsizeselect formatselect |" +
                " alignleft aligncenter alignjustify numlist bullist|" +
                " charmap print insertfile image table | blocks",
            ],
            quickbars_selection_toolbar:
              "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
            imagetools_cors_hosts: ["picsum.photos"],
            image_caption: true,
            toolbar_mode: "sliding",
            quickbars_insert_toolbar: false,
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        onClick={handleSaveEditor}
      >
        Save
      </Button>
    </Box>
  );
};
