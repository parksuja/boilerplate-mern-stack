import styled from "styled-components";
import Responsive from "../common/Responsive";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const Wrapper = styled(Responsive)`
  vertical-align: middle;
  // 가운데 수직 정렬함
`;

const ExerCard = styled.div`
  display: inline-block;
`;
//여러개의 엘리먼트를 한줄에 배치

const FirstExer = () => {
  const useStyles = makeStyles({
    // material에서 ui 스타일적용할 수 있도록
    root: {
      maxWidth: "350px",
      height: "100px",
      width: "170px",
      display: "inline-block",
    },
    title: {
      fontSize: 15,
      marginBottom: "10px",
    },
    arrow: {
      display: "inline-block",
      marginBottom: "100px",
      marginLeft: "30px",
      marginRight: "30px",
      color: "#1971c2",
    },
  });

  const classes = useStyles();
  return (
    <>
      <Wrapper>
        <ExerCard>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                STEP 1
              </Typography>
              <Typography variant="h5" component="h2">
                준비운동
              </Typography>
            </CardContent>
          </Card>
          <ArrowForwardIosIcon className={classes.arrow} />
        </ExerCard>
        <ExerCard>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                STEP 2
              </Typography>
              <Typography variant="h5" component="h2">
                몸풀기
              </Typography>
            </CardContent>
          </Card>
          <ArrowForwardIosIcon className={classes.arrow} />
        </ExerCard>
        <ExerCard>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                STEP 3
              </Typography>
              <Typography variant="h5" component="h2">
                스쿼트
              </Typography>
            </CardContent>
          </Card>
          <ArrowForwardIosIcon className={classes.arrow} />
        </ExerCard>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              STEP 4
            </Typography>
            <Typography variant="h5" component="h2">
              마무리
            </Typography>
          </CardContent>
        </Card>
      </Wrapper>
    </>
  );
};

export default FirstExer;
