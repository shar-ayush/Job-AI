import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import {useAuthStore} from "../../store/authStore"
const API_BASE_URL = "http://10.115.124.97:3000"

export default function Resume() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [resumeList, setResumeList] = useState([]);

  const handleUpload = async () => {
    try {
      // 1. Pick PDF
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true
      });

      if (result.canceled) return;

      const file = result.assets[0];

      // Create a temporary optimistic resume so the user sees it immediately
      const tempId = `temp-${Date.now()}`;
      const tempResume = {
        _id: tempId,
        originalName: file.name,
        createdAt: new Date().toISOString(),
        url: file.uri,
        // mark as temporary so we can style or remove if needed
        __temp: true,
      };

      // Optimistically show the resume in the list
      setResumeList((prev) => [tempResume, ...(prev || [])]);

      const formData = new FormData();

      // 2. Append file directly (NO base64!)
      formData.append("resume", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      });

      setUploading(true);

      // 3. Upload to your backend
      const res = await fetch(`${API_BASE_URL}/api/resumes/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      setUploading(false);

      if (!data.success) {
        // remove optimistic item
        setResumeList((prev) => prev.filter((r) => r._id !== tempId));
        Alert.alert("Error", data.error || "Upload failed");
        return;
      }

      // Replace the temp resume with the server-provided resume
      if (data.resume) {
        setResumeList((prev) => prev.map((r) => (r._id === tempId ? data.resume : r)));
      } else {
        // Fallback: refresh from server
        fetchResumes();
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

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const res = await fetch(`${API_BASE_URL}/api/resumes/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLoadingResumes(false);

      if (data.success) setResumeList(data.resumes);
      else Alert.alert("Failed to load resumes");
    } catch (err) {
      setLoadingResumes(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const deleteResume = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/resumes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) return Alert.alert("Error", data.error);

      Alert.alert("Deleted!");
      fetchResumes(); // refresh list
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const openPDF = (url) => {
    router.push({
      pathname: "/preview/[file]",
      params: { file: encodeURIComponent(url) },
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "#f0f4ff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.originalName}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: "#444" }}>
          Uploaded: {new Date(item.createdAt).toLocaleString()}
        </Text>
        {item.__temp ? (
          <Text style={{ color: '#888', fontStyle: 'italic', marginLeft: 8 }}>Uploading...</Text>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (item.__temp) return Alert.alert('Uploading', 'This resume is still uploading.');
            openPDF(item.url);
          }}
          disabled={!!item.__temp}
          style={{
            backgroundColor: item.__temp ? "#9bb3f7" : "#4A6CF7",
            padding: 10,
            borderRadius: 8,
            marginRight: 10,
            opacity: item.__temp ? 0.7 : 1,
          }}
        >
          <Text style={{ color: "white" }}>Open</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (item.__temp) return Alert.alert('Uploading', 'Cannot delete while uploading.');
            deleteResume(item._id);
          }}
          disabled={!!item.__temp}
          style={{
            backgroundColor: item.__temp ? "#e89b9b" : "red",
            padding: 10,
            borderRadius: 8,
            marginRight: 10,
            opacity: item.__temp ? 0.7 : 1,
          }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (item.__temp) return Alert.alert('Uploading', 'Analysis will be available after upload completes.');
            Alert.alert("COMING SOON", "Resume Analysis Phase 3");
          }}
          disabled={!!item.__temp}
          style={{
            backgroundColor: item.__temp ? "#8fcf8f" : "green",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Analyze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Upload Button */}
      <TouchableOpacity
        onPress={handleUpload}
        style={{
          backgroundColor: "#4A6CF7",
          padding: 16,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Upload Resume
        </Text>
      </TouchableOpacity>

      {/* Resume List */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Your Uploaded Resumes
      </Text>

      {loadingResumes ? (
        <ActivityIndicator size="large" color="#4A6CF7" />
      ) : (
        resumeList && resumeList.length > 0 ? (
          <FlatList
            data={resumeList}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        ) : (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ fontSize: 16, color: "#333", marginBottom: 12, textAlign: 'center' }}>
              There are no resumes currently. Upload one to get started!
            </Text>
          </View>
        )
      )}
    </View>
  );
}
