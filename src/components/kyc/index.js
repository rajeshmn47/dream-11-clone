import React, { useState, useEffect } from "react";
import styled from '@emotion/styled';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // Firebase client
import { URL } from "../../constants/userConstants";
import { API } from "../../actions/userAction";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";

// Styled components

const Container = styled.div`
  background-color: #fff;
  @media screen and (min-width: 600px) {
    margin-left: 220px;
  }
`;

const SubContainer = styled.div`
  margin: 50px 10px;
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

const StatusLabel = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: capitalize;
  color: white;

  background-color: ${(props) =>
        props.status === "verified" ? "green" :
            props.status === "pending" ? "orange" :
                props.status === "rejected" ? "red" :
                    "gray"};
`;

const API_URL = "https://your-backend.com/api/kyc";

function UserKYC() {
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

            const data = res.data
            alert("KYC submitted successfully");
            fetchKycStatus(); // Refresh status
            setFiles([]);
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
            const res = await API.get(`${URL}/kyc/status/${user?._id}`);
            setKycStatus(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchKycStatus();
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <Sidebar />
            <Container>
                <SubContainer>
                    <Title>KYC Verification</Title>

                    {/* If no KYC found → allow submit */}
                    {!kycStatus ? (
                        <>
                            <FileInput type="file" multiple onChange={handleFileChange} />
                            <Button onClick={handleSubmit} disabled={uploading}>
                                {uploading ? "Uploading..." : "Submit KYC"}
                            </Button>
                        </>
                    ) : (
                        <>
                            <StatusBox>
                                <div>
                                    <strong>Status:</strong>{" "}
                                    <StatusLabel status={kycStatus.status}>
                                        {kycStatus.status}
                                    </StatusLabel>
                                </div>

                                {kycStatus.docs?.length > 0 && (
                                    <div style={{ marginTop: "10px" }}>
                                        <strong>Your Uploaded Documents:</strong>
                                        {kycStatus.docs.map((url, idx) => (
                                            <DocumentLink
                                                key={idx}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Document {idx + 1}
                                            </DocumentLink>
                                        ))}
                                    </div>
                                )}
                            </StatusBox>

                            {/* Disallow re-submission */}
                            <Button disabled style={{ marginTop: "10px", background: "#777" }}>
                                KYC Already Submitted
                            </Button>
                        </>
                    )}
                </SubContainer>
            </Container>
        </>
    );
}

export default UserKYC;

