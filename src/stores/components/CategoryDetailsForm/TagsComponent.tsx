import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    fieldContainer: {
      // "&-moz-box-shadow": "0px 3px 14px 1px rgba(74,74,74,0.2)",
      // "&-webkit-box-shadow": "0px 3px 14px 1px rgba(74,74,74,0.2)",
      background: "white",
      border: "1px solid #BDBDBD",
      borderColor: "#BDBDBD",
      borderRadius: "4px",
      // boxShadow: "0px 3px 14px 1px rgba(74,74,74,0.2)",
      display: "flex",
      flexWrap: "wrap",
      // maxWidth: "600px",
      minHeight: "48px",
      position: "relative"
      // width: "600px",
    },
    icon: {
      cursor: "pointer",
      fontSize: "16px",
      lineHeight: "24px",
      marginLeft: "12px",
      marginTop: "4px"
    },
    inputWrapper: {
      "& form": {
        display: "flex",
        flex: "1"
      },
      "& input": {
        "&::-webkit-input-placeholder": {
          color: "#3d3d3d99"
        },
        border: "transparent",
        borderRadius: "4px",
        color: "#000",
        flex: "1",
        fontFamily: "'Dosis', sans-serif",
        fontSize: "16px",
        lineHeight: "24px",
        margin: "0",
        outline: "none",
        padding: "12px"
      },
      display: "flex",
      flex: "1",
      minHeight: "48px",
      minWidth: "60px",
      overflow: "hidden"
    },
    limitText: {
      position: "absolute",
      right: "13px"
    },
    tile: {
      backgroundColor: "#f5f5f5",
      borderRadius: "3px",
      color: "#000",
      display: "flex",
      fontSize: "14px",
      lineHeight: "24px",
      margin: "6px",
      padding: "3px 10px"
    }
  });

class Tile extends React.Component<any> {
  render() {
    const tile = this.props.tile;
    const id = this.props.id;
    const classes = this.props.classes;
    return (
      <span className={classes.tile}>
        <span>{tile.text}</span>
        <div className={classes.icon}>
          <CloseIcon
            onClick={() => this.props.removeTile(id)}
            fontSize="small"
          />
        </div>
        {/* <i className={classes.tile} onClick={() => this.props.removeTile(id)}></i> */}
      </span>
    );
  }
}
interface TagsState {
  tiles: any;
  tileIds: any;
  currentValue: string;
}

const TagsComponent = withStyles(styles, { name: "TagsComponent" })(
  class TagsComponent extends React.Component<any, TagsState> {
    constructor(props) {
      super(props);
      this.addTile = this.addTile.bind(this);
      this.removeTile = this.removeTile.bind(this);
      this.editLastTile = this.editLastTile.bind(this);
      this.state = {
        currentValue: "",
        tileIds: [],
        tiles: {},
      }
    }
    addTile(tile) {
      // pull tiles array out of the state
      // see destructoring
      const { tiles, tileIds } = this.state;

      const newTileId = (tileIds.length - 1) + 1;
      tileIds.push(newTileId);
      tiles[newTileId] = { text: tile };

      // reset the input value
      const currentValue = "";

      // this is the same as saying tiles : tiles
      this.setState({
        currentValue,
        tileIds,
        tiles,
      })
    }

    removeTile(id) {
      // console.log('removeTile::', this.state.tiles[id]);
      const { tiles } = this.state;
      delete tiles[id];
      this.setState({ tiles });
    }

    editLastTile() {
      const { tiles } = this.state;
      const lastTileValue = Object.keys(tiles).slice(-1).pop();
      // console.log('the last tile object is:', tiles[lastTileValue].text);
      // store last tile text value before deleting it
      const currentValue = tiles[lastTileValue].text;
      delete tiles[lastTileValue];
      this.setState({
        currentValue,
        tiles,
      });
    }
    render() {
      const classes = this.props.classes;
      return (
        <>
          <p>
            Add Keyword to your store to help customers find you (Example-Vegan,
            Face Masks, Groceries)
          </p>
          <div className={classes.fieldContainer}>
            {Object.keys(this.state.tiles).map(key => (
              <Tile
                key={key}
                id={key}
                tile={this.state.tiles[key]}
                removeTile={this.removeTile}
                classes={classes}
              />
            ))}
            <Input
              addTile={this.addTile}
              editLastTile={this.editLastTile}
              tiles={this.state.tiles}
              value={this.state.currentValue}
              classes={classes}
            />
          </div>
        </>
      );
    }
  }
);

class Input extends React.Component<any> {
  text: any;
  tagForm: any;
  tagEvent(e) {
    const tag = this.text.value;
    const tagGroup = tag.split(" ");
    const tiles = this.props.tiles;
    const hasTiles = Object.keys(tiles).length > 0;

    if (e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      tagGroup.map(tag => this.props.addTile(tag));
      this.tagForm.reset();
    }

    if (e.keyCode === 8 && hasTiles && tag === "") {
      e.preventDefault();
      this.props.editLastTile();
      // this trigger the default value eachtime we hit delete
      this.tagForm.reset();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.text.selectionStart = this.text.value.length;
      this.text.selectionEnd = this.text.value.length;
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <>
        <p className={classes.limitText}>Maximum of 4</p>

        <div className={classes.inputWrapper}>
          <form ref={input => (this.tagForm = input)}>
            <input
              ref={input => (this.text = input)}
              type="text"
              name="new-item"
              placeholder="Enter Tag"
              autoComplete="off"
              defaultValue={this.props.value}
              onKeyDown={e => this.tagEvent(e)}
            />
          </form>
        </div>
      </>
    );
  }
}

// AccountConfirm.displayName = "AccountConfirm";
export default TagsComponent;
