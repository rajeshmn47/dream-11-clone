import React, { useState, useEffect } from "react";
import styled from '@emotion/styled';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // Firebase client
import { URL } from "../../constants/userConstants";
import { API } from "../../actions/userAction";
import { useSelector } from "react-redux";

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FileInput = styled.input`
  display: block;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "#999" : "#1976d2")};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const StatusBox = styled.div`
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const DocumentLink = styled.a`
  display: block;
  margin-top: 5px;
  color: #1976d2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const API_URL = "https://your-backend.com/api/kyc";

function UserKYC({ currentUserId }) {
    const { user } = useSelector(state => state.user);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [kycStatus, setKycStatus] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    // Upload files to Firebase and submit URLs to backend
    const handleSubmit = async () => {
        if (!files.length) return alert("Please select files");

        try {
            setUploading(true);
            const uploadedUrls = [];

            for (const file of files) {
                const fileRef = ref(storage, `kyc/${user?._id}/${Date.now()}-${file.name}`);
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                uploadedUrls.push(url);
            }

            // Send URLs to backend
            const res = await API.post(`${URL}/kyc/submit`,
                { userId: user?._id, docs: uploadedUrls });

            const data = await res.json();
            if (res.ok) {
                alert("KYC submitted successfully");
                fetchKycStatus(); // Refresh status
                setFiles([]);
            } else {
                alert(data.message || "Failed to submit KYC");
            }

            setUploading(false);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
            setUploading(false);
        }
    };

    // Fetch current KYC status for user
    const fetchKycStatus = async () => {
        try {
            const res = await fetch(`${API_URL}/status/${currentUserId}`);
            if (res.status === 404) {
                setKycStatus(null);
                return;
            }
            const data = await res.json();
            setKycStatus(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchKycStatus();
    }, []);

    return (
        <Container>
            <Title>Submit KYC Documents</Title>

            <FileInput type="file" multiple onChange={handleFileChange} />
            <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? "Uploading..." : "Submit KYC"}
            </Button>

            {kycStatus && (
                <StatusBox>
                    <strong>Status:</strong> {kycStatus.status}
                    <div>
                        <strong>Documents:</strong>
                        {kycStatus.docs.map((url, idx) => (
                            <DocumentLink key={idx} href={url} target="_blank" rel="noopener noreferrer">
                                Document {idx + 1}
                            </DocumentLink>
                        ))}
                    </div>
                </StatusBox>
            )}
        </Container>
    );
}

export default UserKYC;

