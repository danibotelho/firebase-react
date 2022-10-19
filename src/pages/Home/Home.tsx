import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, Typography } from "@mui/material";

export const Home = () => {
  const ref = collection(firestore, "messages");
  const [body, setBody] = useState("");
  const { logout, getCurrentUser } = useAuth();
  const [userInitials, setUserInitials] = useState<string>();

  useEffect(() => {
    getCurrentUser().then((res: any) => {
      setUserInitials(res.displayName);
    });
  }, []);

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

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <Box sx={{ margin: "15px", display: "flex" }}>
        <Typography variant="h4"> {userInitials} </Typography>
        <Button
          type="submit"
          variant="outlined"
          onClick={() => handleLogout()}
          sx={{ marginLeft: "15px" }}
        >
          Sign Out
        </Button>
      </Box>
      <Box sx={{ margin: "15px", padding: "8px" }}>
        <Editor
          textareaName="content"
          initialValue=""
          onEditorChange={(newText) => {
            setBody(newText);
          }}
          init={{
            height: 300,
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
        <Button
          type="submit"
          variant="contained"
          onClick={handleSaveEditor}
          sx={{ margin: "8px" }}
        >
          Save
        </Button>
      </Box>
      <Box
        sx={{
          margin: "15px",
          padding: "20px",
          height: "300px",
          border: `dashed 3px #5C73DB`,
          borderRadius: "25px",
        }}
      >
        <Typography dangerouslySetInnerHTML={{ __html: body }} />
      </Box>
    </Box>
  );
};
