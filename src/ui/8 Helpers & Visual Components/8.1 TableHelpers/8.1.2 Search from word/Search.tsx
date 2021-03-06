import {Input} from "@mui/material";
import s from './Search.module.css'
import {ChangeEvent} from "react";

export const Search = ({searchValue, onChangeSearch, placeholder = `Search`, ...props}: SearchType) => {
    return (
        <Input  color={'secondary'}
            value={searchValue}
            className={s.input}
            placeholder={placeholder}
            onChange={onChangeSearch}
                {...props}
        />
    );
}

type SearchType = {
    searchValue: string
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}