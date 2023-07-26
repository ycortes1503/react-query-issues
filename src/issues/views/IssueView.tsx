import { Link, useParams, Navigate } from "react-router-dom";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";

export const IssueView = () => {
  const params = useParams();
  const { id = "0" } = params;

  const { issueQuery, commentsQuery } = useIssue(Number(id));
  const issue = issueQuery.data;

  if (issueQuery.isLoading) return <LoadingIcon />;

  if (!issue) return <Navigate to="./issues/list" />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>
      {issue && <IssueComment issue={issue} />}

      {commentsQuery.isLoading && <LoadingIcon />}

      {commentsQuery.data?.map((issue) => (
        <IssueComment key={issue.id} issue={issue} />
      ))}
    </div>
  );
};
