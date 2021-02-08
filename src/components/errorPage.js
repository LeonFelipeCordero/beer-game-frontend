import { Paper, Typography } from '@material-ui/core';

function ErrorPage(props) {
  return (
    <div>
      <Paper className="error-window">
        <Typography variant="h4" color="error">
          :'( Something went wrong )':
        </Typography>
        <Typography variant="h6">We are working to fix it</Typography>
      </Paper>
    </div>
  );
}

export default ErrorPage;
