import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import {
  Circle,
  Grid,
  Img,
  Layout,
  QuadBezier,
  Rect,
  Txt,
  Video,
} from "@motion-canvas/2d/lib/components";
import { createRef, makeRef, range } from "@motion-canvas/core/lib/utils";
import { all } from "@motion-canvas/core/lib/flow";
import confettiGif from "/gifs/confetti.mp4";
import { useRandom } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const LIGHT_PURPLE = "#b391ff";
  const QUIZZY_PURPLE = "#8358E8";
  const DARK_PURPLE = "#3B276B";
  const BLACK = "#000000";
  const WHITE = "#FFFFFF";

  const DEGREE_TILT = -5;

  const MAXIMUM_WIDTH = 1920;
  const MAXIMUM_HEIGHT = 1080;

  const FLASHCARD_WIDTH = 1275 * 0.5;
  const FLASHCARD_HEIGHT = 727 * 0.5;
  const random = useRandom();
  const integer = random.nextInt(0, 10);
  const CONFETTI_RECT_SIZE = 15;

  const layoutFlex = createRef<Layout>();

  const purpleBackground = createRef<Rect>();

  const decorationGrid = createRef<Grid>();

  const flashcard = createRef<Rect>();
  const welcomeToText = createRef<Txt>();

  const quizzyText = createRef<Txt>();
  const bezier = createRef<QuadBezier>();

  const rects: Rect[] = [];

  view.add(
    <>
      <Layout ref={layoutFlex}>
        <Rect
          ref={purpleBackground}
          fill={QUIZZY_PURPLE}
          width={MAXIMUM_WIDTH}
          height={MAXIMUM_HEIGHT}
        />
        <Grid
          ref={decorationGrid}
          width={MAXIMUM_WIDTH}
          height={MAXIMUM_HEIGHT}
          lineWidth={1}
          stroke={"#BB99FF"}
        />
        <Rect
          ref={flashcard}
          fill={WHITE}
          width={FLASHCARD_WIDTH}
          height={FLASHCARD_HEIGHT}
          shadowBlur={0}
          shadowColor={"rgba(0, 0, 0, 0.7)"}
          radius={20}
          opacity={0}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
          gap={20}
          layout
        >
          <Txt
            ref={welcomeToText}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={700}
            fill={QUIZZY_PURPLE}
            fontSize={24}
            letterSpacing={10}
          ></Txt>
          <Txt
            ref={quizzyText}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={700}
            fill={QUIZZY_PURPLE}
            fontSize={82}
          ></Txt>
        </Rect>
        <QuadBezier
          ref={bezier}
          lineWidth={4}
          stroke={QUIZZY_PURPLE}
          p0={[-250, 50]}
          p1={[0, 150]}
          p2={[250, 50]}
          end={0}
        />
      </Layout>
    </>
  );
  /*
  view.add(
    range(500).map((i) => (
      <Rect
        ref={makeRef(rects, i)}
        width={CONFETTI_RECT_SIZE}
        height={CONFETTI_RECT_SIZE}
        x={random.nextInt(-MAXIMUM_WIDTH, MAXIMUM_WIDTH)}
        y={-MAXIMUM_HEIGHT}
        fill={DARK_PURPLE}
      />
    ))
  );*/

  yield* all(
    layoutFlex().scale(2, 0.5),
    layoutFlex().rotation(DEGREE_TILT, 0.5),
    flashcard().shadowBlur(50, 1),
    flashcard().opacity(1, 0.5)
  );
  yield* all(
    decorationGrid().lineWidth(2, 0.5),
    welcomeToText().text("WELCOME TO", 0.3),
    quizzyText().text("QUIZZY!", 1),
    bezier().end(1, 1)
  );
  /*
  for (var i = 0; i < rects.length; i++) {
    yield* rects[i].position.y(300, 0.05);
  }*/
});
