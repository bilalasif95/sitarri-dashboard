import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import classNames from "classnames";
import React from "react";
import { BACKEND_URL } from "../../config";

const useStyles = makeStyles(
  theme => ({
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%"
    },
    imageContainer: {
      "&:hover, &.dragged": {
        "& $imageOverlay": {
          display: "block"
        }
      },
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(),
      height: 148,
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      width: 148
    },
    imageOverlay: {
      background: "rgba(0, 0, 0, 0.6)",
      cursor: "move",
      display: "none",
      height: 148,
      left: 0,
      position: "absolute",
      top: 0,
      width: 148
    },
    imageOverlayShow: {
      "&$imageOverlay": {
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }
    },
    imageOverlayToolbar: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }),
  { name: "ImageTile" }
);

interface ImageTileProps {
  image: any;
  alt: string;
  loading?: boolean;
  onImageDelete?: () => void;
  onImageEdit?: (event: React.ChangeEvent<any>) => void;
}

const ImageTile: React.FC<ImageTileProps> = props => {
  const { loading, onImageDelete, onImageEdit, image, alt } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.imageContainer} data-tc="product-image">
      <div
        className={classNames(classes.imageOverlay, {
          [classes.imageOverlayShow]: loading
        })}
      >
        {loading ? (
          <CircularProgress size={32} />
        ) : (
            <div className={classes.imageOverlayToolbar}>
              {onImageEdit && (
                <IconButton color="primary" onClick={onImageEdit}>
                  <EditIcon />
                </IconButton>
              )}
              {onImageDelete && (
                <IconButton color="primary" onClick={onImageDelete}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          )}
      </div>
      <img className={classes.image} src={BACKEND_URL + "/media/" + image} alt={alt} />
    </div>
  );
};
ImageTile.displayName = "ImageTile";
export default ImageTile;
