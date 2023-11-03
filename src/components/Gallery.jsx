import { useState } from "react";
import GalleryHeader from "./GalleryHeader";
import GalleryImage from "./GalleryImage";
import ImageUploader from "./ImageUploader";
const images = [
  { id: 1, thumbnail: "assets/image-1.webp"  },
  { id: 2, thumbnail: "assets/image-2.webp"  },
  { id: 3, thumbnail: "assets/image-3.webp"  },
  { id: 4, thumbnail: "assets/image-4.webp"  },
  { id: 5, thumbnail: "assets/image-5.webp"  },
  { id: 6, thumbnail: "assets/image-6.webp"  },
  { id: 7, thumbnail: "assets/image-7.webp"  },
  { id: 8, thumbnail: "assets/image-8.webp"  },
  { id: 9, thumbnail: "assets/image-9.webp"  },
  { id: 10, thumbnail: "assets/image-10.jpeg" },
  { id: 11, thumbnail: "assets/image-11.jpeg" },
];

const Gallery = () => {

  const [selectThumbnails, setSelectThumbnails] = useState([]);
  const [thumbnails, setThumbnails] = useState(images);
  const [dragging, setDragging] = useState(false); 
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files).map((file, index) => {
      const id = thumbnails.length + index + 1;
      const thumbnail = URL.createObjectURL(file);
      return { id, thumbnail };
    });
    setThumbnails([...thumbnails, ...newImages]);
  };

  const handleDeleteClick = () => {
    const updatedImages = thumbnails.filter(
      (image) => !selectThumbnails.some((selected) => selected.id === image.id)
    );
    setThumbnails(updatedImages);
    setSelectThumbnails([]);
  };

  const handleDragStart = (image) => {
    setDragging(true);
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
  };

  const handleDrop = (targetIndex) => {
    setDragging(false);

    if (draggedImage) {
      const updatedImages = thumbnails.filter(
        (image) => image.id !== draggedImage.id
      );
      updatedImages.splice(targetIndex, 0, draggedImage);
      setThumbnails(updatedImages);
      setDraggedImage(null);
    }
  };

  return (
    <main
      className={`min-h-screen w-screen flex flex-row items-center justify-center md:p-0 p-4`}>
      <section className="lg:w-1/2 md:w-3/4 w-full bg-white rounded-lg shadow">
        <div className="flex flex-col gap-y-2">
          <GalleryHeader
            selectThumbnails={selectThumbnails}
            setSelectThumbnails={setSelectThumbnails}
            handleDeleteClick={handleDeleteClick}
          />
          <hr />
          <section className="h-full w-full p-6">
            <div
              className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6"
              onDragOver={handleDragOver}
            >
              {thumbnails.map((image, index) => (
                <GalleryImage
                  key={index}
                  image={image}
                  index={index}
                  selectThumbnails={selectThumbnails}
                  setSelectThumbnails={setSelectThumbnails}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  dragging={dragging}
                  draggedIndex={draggedIndex}
                />
              ))}
              <ImageUploader handleFileChange={handleFileChange} />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
