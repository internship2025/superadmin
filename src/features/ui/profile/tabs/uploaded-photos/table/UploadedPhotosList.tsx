import { GetPostsQuery } from "@/shared/api/query.generated";
import Image from "next/image";
import s from "./UploadedPhotosList.module.css";
import { forwardRef } from "react";
import { Spinner } from "@/shared/ui/spinner/Spinner";

type Images = GetPostsQuery["getPosts"]["items"][0];

interface UploadedPhotosListProps {
  images: Images[] | undefined;
  loading: boolean;
  totalCount: number;
}
export const UploadedPhotosList = forwardRef<
  HTMLDivElement,
  UploadedPhotosListProps
>(({ images, loading, totalCount }, ref) => {
  if (!totalCount) {
    return <div>There are no posts</div>;
  }
  return (
    <div className={s.container}>
      {images?.map((it) => {
        if (!it.images?.length) return null;
        const firstImage = it.images[0];
        if (!firstImage?.url) return null;
        return (
          <div key={it.id} className={s.galleryItem}>
            <Image
              src={firstImage.url}
              width={234}
              height={228}
              alt="Post image"
            />
          </div>
        );
      })}
      
            {loading && <Spinner />}
      <div ref={ref}></div>
    </div>
  );
});
