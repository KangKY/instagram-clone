import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import styled from "styled-components";
import { Link } from "react-router-dom";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const FabStyled = styled(Fab)`
  position:fixed!important;
  right:10px;
  bottom: 20px;
`;



function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <Link to={`/upload`}>
      <FabStyled color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </FabStyled>
    </Link>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);