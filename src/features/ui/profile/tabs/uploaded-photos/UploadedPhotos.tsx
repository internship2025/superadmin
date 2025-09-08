import { UploadedPhotosList } from "./table/UploadedPhotosList";
import { useLazyPhotos } from "@/features/ui/usersList/ui/hooks/useLazyPhotos";

export const UploadedPhotos = ({
  userName,
}: {
  userName: string | undefined;
}) => {
  const {totalCount, photos, loading, observerRef } = useLazyPhotos(userName);
  
  return (
    <div>
      <UploadedPhotosList totalCount = {totalCount} images={photos} ref = {observerRef} loading = {loading} />
    </div>
  );
};
