

export interface IWorkSampleData{
    title:string,
    description:string,
    images:string[]
}


export type TEditableWorkSampleData = Partial<
Pick<
IWorkSampleData,
"description" | 
"images" | 
"title"
>
>;
