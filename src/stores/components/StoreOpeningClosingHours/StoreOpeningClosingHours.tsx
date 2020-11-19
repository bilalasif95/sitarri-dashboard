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
import { maybe } from "../../../misc";

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

function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : "";
  const mDisplay = m > 0 ? m < 10 ? "0" + m + ":" : m + ":" : "00:";
  const sDisplay = s > 0 ? s < 10 ? "0" + s : s : "00";
  return hDisplay + mDisplay + sDisplay;
}

export const StoreOpeningClosingHours: React.FC<any> = (
  // { disabled, data, onChange, errors },
  { disabled, data, onChange },
  props
) => {
  const intl = useIntl();
  const classes = useStyles(props);
  const [mondayTime, setMondayTime] = React.useState([0, 1440]);
  const [tuesdayTime, setTuesdayTime] = React.useState([0, 1440]);
  const [wednesdayTime, setWednesdayTime] = React.useState([0, 1440]);
  const [thursdayTime, setThursdayTime] = React.useState([0, 1440]);
  const [fridayTime, setFridayTime] = React.useState([0, 1440]);
  const [saturdayTime, setSaturdayTime] = React.useState([0, 1440]);
  const [sundayTime, setSundayTime] = React.useState([0, 1440]);

  React.useEffect(() => {
    setMondayTime([
      maybe(() => data && data.mondayOpeningTime, 0), maybe(() => data && data.mondayClosingTime, 0)
    ])
    setTuesdayTime([
      maybe(() => data && data.tuesdayOpeningTime, 0), maybe(() => data && data.tuesdayClosingTime, 0)
    ])
    setWednesdayTime([
      maybe(() => data && data.wednesdayOpeningTime, 0), maybe(() => data && data.wednesdayClosingTime, 0)
    ])
    setThursdayTime([
      maybe(() => data && data.thursdayOpeningTime, 0), maybe(() => data && data.thursdayClosingTime, 0)
    ])
    setFridayTime([
      maybe(() => data && data.fridayOpeningTime, 0), maybe(() => data && data.fridayClosingTime, 0)
    ])
    setSaturdayTime([
      maybe(() => data && data.saturdayOpeningTime, 0), maybe(() => data && data.saturdayClosingTime, 0)
    ])
    setSundayTime([
      maybe(() => data && data.sundayOpeningTime, 0), maybe(() => data && data.sundayClosingTime, 0)
    ])
  }, [data])

  const mondayHandleChange = (event, newValue) => {
    event.preventDefault();
    setMondayTime(newValue);
    data.mondayOpeningTime = newValue[0];
    data.mondayClosingTime = newValue[1];
  };

  const tuesdayHandleChange = (event, newValue) => {
    event.preventDefault();
    setTuesdayTime(newValue);
    data.tuesdayOpeningTime = newValue[0];
    data.tuesdayClosingTime = newValue[1];
  };

  const wednesdayHandleChange = (event, newValue) => {
    event.preventDefault();
    setWednesdayTime(newValue);
    data.wednesdayOpeningTime = newValue[0];
    data.wednesdayClosingTime = newValue[1];
  };

  const thursdayHandleChange = (event, newValue) => {
    event.preventDefault();
    setThursdayTime(newValue);
    data.thursdayOpeningTime = newValue[0];
    data.thursdayClosingTime = newValue[1];
  };

  const fridayHandleChange = (event, newValue) => {
    event.preventDefault();
    setFridayTime(newValue);
    data.fridayOpeningTime = newValue[0];
    data.fridayClosingTime = newValue[1];
  };

  const saturdayHandleChange = (event, newValue) => {
    event.preventDefault();
    setSaturdayTime(newValue);
    data.saturdayOpeningTime = newValue[0];
    data.saturdayClosingTime = newValue[1];
  };

  const sundayHandleChange = (event, newValue) => {
    event.preventDefault();
    setSundayTime(newValue);
    data.sundayOpeningTime = newValue[0];
    data.sundayClosingTime = newValue[1];
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
                checked={data.mondayOpenClose}
                disabled={disabled}
                label=""
                name="mondayOpenClose"
                onChange={onChange}
              />
            </div>
            <div className={classes.openOrClose}>
              {data.mondayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.mondayOpenClose ? <>Open:&nbsp;
                {
                  mondayTime[0] <= 0 ? <>00:00</> : secondsToHms(mondayTime[0])
                } - {
                  mondayTime[1] <= 0 ? <>00:00</> : secondsToHms(mondayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              value={mondayTime}
              step={30}
              max={1440}
              onChange={mondayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
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
                checked={data.tuesdayOpenClose}
                disabled={disabled}
                label=""
                name="tuesdayOpenClose"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              {data.tuesdayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.tuesdayOpenClose ? <>Open:&nbsp;
                {
                  tuesdayTime[0] <= 0 ? <>00:00</> : secondsToHms(tuesdayTime[0])
                } - {
                  tuesdayTime[1] <= 0 ? <>00:00</> : secondsToHms(tuesdayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              step={30}
              max={1440}
              value={tuesdayTime}
              onChange={tuesdayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
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
                checked={data.wednesdayOpenClose}
                disabled={disabled}
                label=""
                name="wednesdayOpenClose"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              {data.wednesdayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.wednesdayOpenClose ? <>Open:&nbsp;
                {
                  wednesdayTime[0] <= 0 ? <>00:00</> : secondsToHms(wednesdayTime[0])
                } - {
                  wednesdayTime[1] <= 0 ? <>00:00</> : secondsToHms(wednesdayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              value={wednesdayTime}
              step={30}
              max={1440}
              onChange={wednesdayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
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
                checked={data.thursdayOpenClose}
                disabled={disabled}
                label=""
                name="thursdayOpenClose"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              {data.thursdayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.thursdayOpenClose ? <>Open:&nbsp;
                {
                  thursdayTime[0] <= 0 ? <>00:00</> : secondsToHms(thursdayTime[0])
                } - {
                  thursdayTime[1] <= 0 ? <>00:00</> : secondsToHms(thursdayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              value={thursdayTime}
              step={30}
              max={1440}
              onChange={thursdayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
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
                checked={data.fridayOpenClose}
                disabled={disabled}
                label=""
                name="fridayOpenClose"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              {data.fridayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.fridayOpenClose ? <>Open:&nbsp;
                {
                  fridayTime[0] <= 0 ? <>00:00</> : secondsToHms(fridayTime[0])
                } - {
                  fridayTime[1] <= 0 ? <>00:00</> : secondsToHms(fridayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              value={fridayTime}
              step={30}
              max={1440}
              onChange={fridayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
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
                checked={data.saturdayOpenClose}
                disabled={disabled}
                label=""
                name="saturdayOpenClose"
                onChange={onChange}
              />
            </div>

            <div className={classes.openOrClose}>
              {data.saturdayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.saturdayOpenClose ? <>Open:&nbsp;
                {
                  saturdayTime[0] <= 0 ? <>00:00</> : secondsToHms(saturdayTime[0])
                } - {
                  saturdayTime[1] <= 0 ? <>00:00</> : secondsToHms(saturdayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              value={saturdayTime}
              step={30}
              max={1440}
              onChange={saturdayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
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
                checked={data.sundayOpenClose}
                disabled={disabled}
                label=""
                name="sundayOpenClose"
                onChange={onChange}
              />
            </div>
            <div className={classes.openOrClose}>
              {data.sundayOpenClose ? <p className={classes.openText}>Open</p>
                : <p className={classes.closeText}>Closed</p>}
            </div>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              {data.sundayOpenClose ? <>Open:&nbsp;
                {
                  sundayTime[0] <= 0 ? <>00:00</> : secondsToHms(sundayTime[0])
                } - {
                  sundayTime[1] <= 0 ? <>00:00</> : secondsToHms(sundayTime[1])
                }</> : <>Closed</>}
            </Typography>
            <Slider
              value={sundayTime}
              step={30}
              max={1440}
              onChange={sundayHandleChange}
              // valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            // getAriaValueText={valuetext}
            />
          </div>
        </div>
        {/* Opening Hours */}
      </CardContent>
    </Card>
  );
};
export default StoreOpeningClosingHours;
