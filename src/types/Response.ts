
export interface IAxiosResponse{
    success:boolean,
    message:string
}


export interface IWorkSampleResponse {
    _id: string;
    title: string;
    description: string;
    images: string[];
}

export interface ICategory {
    image:string,
    name:string,
}