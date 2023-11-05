
export type OrderGetAllDto = {
id :string,
title:string,
userName:string,
password:string,
isFavourite:boolean,
userId:string,
categories:OrderGetAllCategoryDto[],
showPassword:boolean | false
};

export type OrderGetAllCategoryDto = {
    id:string,
    name:string
}

export type OrderAddCommand = {
    title: string;
    userName: string;
    password: string;
    isFavourite: boolean;
    categoryIds: string[];
}

