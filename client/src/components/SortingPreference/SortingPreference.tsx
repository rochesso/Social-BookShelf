import { useState } from "react";
import { SortPreferences } from "../../globals";
import { useAppDispatch } from "../../hooks/useStore";

import styles from "./SortingPreference.module.css";

type AppProps = {
  store: any;
  sortAction: any;
};

const SortingPreference = ({ store, sortAction }: AppProps) => {
  const dispatch = useAppDispatch();
  const [sortPreference, setSorPreference] = useState<Config["sortPreference"]>(
    store.sortPreference
  );

  const sortPreferenceHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value as SortPreferences;
    const response = await dispatch(sortAction(newValue));
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
