import { useState } from "react";
import { SortPreferences } from "../../globals";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { sortPreferenceAction } from "../../store/book-actions";

import styles from "./SortingPreference.module.css";

const SortingPreference = () => {
  const dispatch = useAppDispatch();
  const bookStore = useAppSelector((state) => state.bookStore);
  const [sortPreference, setSorPreference] = useState<Config["sortPreference"]>(
    bookStore.sortPreference
  );

  const sortPreferenceHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value as SortPreferences;
    const response = await dispatch(sortPreferenceAction(newValue));
    if (response) {
      setSorPreference(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="sortingPreference">
        Library sorting preference:
      </label>
      <select
        className={styles.select}
        id="sortingPreference"
        name="sortingPreference"
        value={sortPreference}
        onChange={sortPreferenceHandler}
      >
        <option value={SortPreferences.author}>Author</option>
        <option value={SortPreferences.title}>Title</option>
        <option value={SortPreferences.lastModified}>Last Modified</option>
        <option value={SortPreferences.timeAdded}>Time Added</option>
      </select>
    </div>
  );
};

export default SortingPreference;
