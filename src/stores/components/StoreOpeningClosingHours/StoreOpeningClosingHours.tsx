import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
// import FormSpacer from "@saleor/components/FormSpacer";
// import RichTextEditor from "@saleor/components/RichTextEditor";
import { commonMessages } from "@saleor/intl";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import React from "react";
import { useIntl } from "react-intl";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
  theme => ({
    closeText: {
      color: "#eb5659",
      fontWeight: 600
    },
    closingHours: {
      marginBottom: "0px !important"
    },
    openOrClose: {
      display: "flex"
    },
    openText: {
      color: "#6aca3d",
      fontWeight: 600
    },
    openingHours: {
      "& .MuiSlider-thumb": {
        background: "#fff",
        border: "1px solid"
      },
      "& .MuiTypography-gutterBottom": {
        marginBottom: "20px"
      },
      marginBottom: "30px"
    },
    root: {
      "& .MuiSlider-root": {
        "& .MuiSlider-rail": {
          background: "#cac7c7 !important"
        },
        color: "#91d5fe"
      },
      width: "300"
    },
    sliderBox: {
      alignItems: "center",
      display: "flex"
    },
    toggleBtn: {
      width: "22%"
    },

    toolbar: { marginTop: -theme.spacing(0.5) },
    weekDays: {
      width: "30%"
    }
  }),

  { name: "StoreOpeningClosingHours" }
);

function valuetext(value) {
  return `${value}°C`;
}

export const StoreOpeningClosingHours: React.FC<any> = (
  // { disabled, data, onChange, errors },
  { disabled, onChange },
  props
) => {
  const intl = useIntl();
  const classes = useStyles(props);
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = newValue => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.storeOpeningClosingHours)}
      />
      <CardContent>
        {/* Opening Hours */}

        <div className={classes.openingHours}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Monday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>
            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Open: 7:00 - 14:00
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}

        {/* Opening Hours */}

        <div className={classes.openingHours}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Tuesday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Open: 7:00 - 14:00
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}

        {/* Opening Hours */}

        <div className={classes.openingHours}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Wednesday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Open: 7:00 - 14:00
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}

        {/* Opening Hours */}

        <div className={classes.openingHours}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Thursday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Open: 7:00 - 14:00
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}

        {/* Opening Hours */}

        <div className={classes.openingHours}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Friday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Open: 7:00 - 14:00
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}

        {/* Opening Hours */}

        <div className={classes.openingHours}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Saturday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Open: 7:00 - 14:00
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}

        {/* Opening Hours */}

        <div className={`${classes.openingHours} ${classes.closingHours}`}>
          <div className={classes.sliderBox}>
            <p className={classes.weekDays}>Sunday</p>
            <div className={classes.toggleBtn}>
              <ControlledSwitch
                checked={false}
                disabled={disabled}
                label=""
                name="hasVariants"
                onChange={onChange}
              />
            </div>
            <div className={classes.openOrClose}>
              <p className={classes.openText}>Open</p>
              <p className={classes.closeText}>Closed</p>
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Closed
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}
      </CardContent>
    </Card>
  );
};
export default StoreOpeningClosingHours;
