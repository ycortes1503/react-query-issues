import { useState } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { State } from "../interfaces";
import { useIssuesInfinite } from "../hooks/useIssuesInfinite";

export const ListViewInfinite = () => {
  const [selectedLabels, setselectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setselectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setselectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            onStateChanged={(newState) => setState(newState)}
            state={state}
          />
        )}

        <button
          className="btn btn-outline-primary mt-2"
          disabled={!issuesQuery.hasNextPage}
          onClick={() => {
            issuesQuery.fetchNextPage();
          }}
        >
          Load more...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
