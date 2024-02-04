import { useState } from "react";

import * as Api from "api";
import { useAsyncEffect } from "hooks";

import { CategorySelectorProps } from "./index";

function useCategorySelector(props: CategorySelectorProps) {
    const { createCategoryOnEnter = false, onChange } = props;
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        const categoryExists = categories.includes(newCategory);
        if (!createCategoryOnEnter && !categoryExists) {
            return;
        }

        const newCategories = Array.from(new Set([...categories, newCategory]));

        setCategories(newCategories);
        onChange(newCategories);

        setNewCategory("");
    };

    const handleUpdateCategories = (_: any, newValue: string[]) => {
        onChange(Array.from(new Set([...newValue])));
    };

    useAsyncEffect(async () => {
        const categories = await Api.cases.challenges.listCategories();
        setCategories(categories);
    }, []);

    return {
        categories,
        setCategories,
        newCategory,
        setNewCategory,
        handleAddCategory,
        handleUpdateCategories,
    };
}

export default useCategorySelector;
