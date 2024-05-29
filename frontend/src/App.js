import React from "react";
import GlobalStyle from "./styles/GlobalStyle.styles";
import HeroSection from "./components/HeroSection";
import CarouselContainer from "./components/CarouselContainer";
import DragAndDropSection from "./components/DragAndDropSection";
import JobCarousel from "./components/JobCarousel";
import useFileUpload from "./hooks/useFileUpload";
import UploadStatus from "./components/UploadStatus";
import AppContainer from "./styles/App.styles";

const App = () => {
  const {
    jobDescriptions,
    uploadStatus,
    fileName,
    uploadProgress,
    handleDrop,
  } = useFileUpload();

  const renderUploadSection = () => (
    <>
      <DragAndDropSection
        onDrop={handleDrop}
        uploadStatus={uploadStatus}
        fileName={fileName}
        uploadProgress={uploadProgress}
      />
      {uploadStatus !== "idle" && <UploadStatus uploadStatus={uploadStatus} />}
    </>
  );

  const renderCarouselSection = () => (
    <CarouselContainer isVisible={jobDescriptions.length > 0}>
      <JobCarousel jobDescriptions={jobDescriptions} />
    </CarouselContainer>
  );

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <HeroSection />
        {jobDescriptions.length === 0
          ? renderUploadSection()
          : renderCarouselSection()}
      </AppContainer>
    </>
  );
};

export default App;
