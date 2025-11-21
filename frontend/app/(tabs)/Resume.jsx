import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import {useAuthStore} from "../../store/authStore"


export default function Resume() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    try {
      // 1. Pick PDF
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true
      });

      if (result.canceled) return;

      const file = result.assets[0];

      const formData = new FormData();

      // 2. Append file directly (NO base64!)
      formData.append("resume", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      });

      setUploading(true);

      // 3. Upload to your backend
      const res = await fetch("http://10.0.2.2:3000/api/resumes/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      setUploading(false);

      const data = await res.json();

      if (!data.success) {
        Alert.alert("Error", data.error || "Upload failed");
        return;
      }

      Alert.alert("Success", "PDF Uploaded!");

      // Navigate to preview screen
      // router.push({
      //   pathname: "/preview/[url]",
      //   params: { url: encodeURIComponent(data.resume.url) }
      // });

    } catch (err) {
      setUploading(false);
      console.error(err);
      Alert.alert("Error", err.message);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TouchableOpacity
        onPress={handleUpload}
        style={{
          backgroundColor: "#4A6CF7",
          padding: 16,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {uploading ? "Uploading..." : "Upload Resume"}
        </Text>
      </TouchableOpacity>

      {uploading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#4A6CF7" />
        </View>
      )}
    </View>
  );
}
