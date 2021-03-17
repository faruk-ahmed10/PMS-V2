import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IGalleryFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
    ProjectId: number | string,
    ArchiveHeadID: number | string,
}

interface IGalleryData {
    gallery_id: number | string,
    ProjectID: number | string,
    ArchiveHeadID: number | string,
    GalleryTitle: number | string,
    Description: number | string,
    Featured: number | string,
    Image: any,

    [key: string]: string | number,
}

export class GalleryProvider {
    public async GetGallerys(GallerysFetcherParams: Partial<IGalleryFetcherParams>) {
        const {ProjectId, ArchiveHeadID, RowsPerPage, PageNumber} = GallerysFetcherParams;
        return await axios.get(Config.API_ROOT + `/gallerys?project_id=${ProjectId}&archive_head_id=${ArchiveHeadID}&RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetGallery(GalleryId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/gallery/${GalleryId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProject() {
        return await axios.get(Config.API_ROOT + `/getProjects`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveGallery(GalleryData: IGalleryData) {
        const formData: any = new FormData();

        for (let key in GalleryData) {
            formData.append(key, GalleryData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_gallery', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteGallery(GalleryId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_gallery?id=${GalleryId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}