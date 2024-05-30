// Create Style
function createStyle (properties: CssProperties): string {
  const result: { [key: string]: undefined | string } = {}

  Object.keys(properties).map((name) => {
    let convertedName = '' 

    for (let i = 0; i < name.length; i++) {
      if (capitalLetters.includes(name[i])) convertedName += `-${name[i].toLowerCase()}`
      else convertedName += name[i]
    }

    result[convertedName] = properties[name]
  })

  applySpecialProperties(result)

  return Object.keys(result).map((key) => `${key}:${result[key]}`).join(';')
}

// Apply Special Properties
function applySpecialProperties (properties: { [key: string]: undefined | string }): CssProperties {
  if (properties.center !== undefined) {
    const values = properties.center.split(' ')

    if (values.includes('row') || values.includes('all')) { 
      if (properties['flex-direction'] === 'column') properties['align-items'] = 'center'
      else properties['justify-content'] = 'center'
    }

    if (values.includes('column') || values.includes('all')) {
      if (properties['flex-direction'] === 'column') properties['justify-content'] = 'center'
      else properties['align-items'] = 'center'
    }

    delete properties.center
  }

  return properties
}

// Parse Style
function parseStyle (style: string): CssProperties {
  const properties: CssProperties = {}

  style.split(';').forEach((chunk) => {
    if (chunk.length > 0) {
      const [name, value] = chunk.split(':')

      properties[name.trim()] = value.trim()
    }
  })

  return properties
}

// CSS Properties
interface CssProperties {
  accentColor?: string,
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit',
  alignItems?: 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'start' | 'end' | 'baseline' | 'initial' | 'inherit',
  alignSelf?: 'auto' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit',
  all?: 'initial' | 'inherit' | 'unset',
  animation?: string,
  animationDelay?: string,
  animationDirection?: string,
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both' | 'initial' | 'inherit',
  animationIterationCount?: string,
  animationName?: string,
  animationPlayState?: 'paused' | 'running' | 'initial' | 'inherit',
  animationTimingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | 'initial' | 'inherit' | string,
  aspectRatio?: string,
  backdropFilter?: string,
  backfaceVisibility?: 'visible' | 'hidden' | 'initial' | 'inherit',
  background?: string,
  backgroundAttachment?: 'scroll' | 'fixed' | 'local' | 'initial' | 'inherit',
  backgroundBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'saturation' | 'color' | 'luminosity',
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'initial' | 'inherit',
  backgroundColor?: string,
  backgroundImage?: string,
  backgroundOrigin?: 'padding-box' | 'border-box' | 'content-box' | 'initial' | 'inherit',
  backgroundPosition?: string,
  backgroundPositionX?: string,
  backgroundPositionY?: string,
  backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'space' | 'round' | 'initial' | 'inherit',
  backgroundSize?: string,
  blockSize?: string,
  border?: string,
  borderBlock?: string,
  borderBlockColor?: string,
  borderBlockEnd?: string,
  borderBlockEndColor?: string,
  borderBlockEndStyle?: CssBorderStyle,
  borderBlockEndWidth?: string,
  borderBlockStart?: string,
  borderBlockStartColor?: string,
  borderBlockStartStyle?: CssBorderStyle,
  borderBlockStartWidth?: string,
  borderBlockStyle?: CssBorderStyle,
  borderBlockWidth?: string,
  borderBottom?: string,
  borderBottomColor?: string,
  borderBottomLeftRadius?: string,
  borderBottomRightRadius?: string,
  borderBottomStyle?: CssBorderStyle,
  borderBottomWidth?: string,
  borderCollapse?: 'collapse' | 'separate' | 'initial' | 'inherit',
  borderColor?: string,
  borderEndEndRadius?: string,
  borderEndStartRadius?: string,
  borderImage?: string,
  borderImageOutset?: string,
  borderImageRepeat?: 'stretch' | 'repeat' | 'round' | 'space' | 'initial' | 'inherit',
  borderImageSlice?: string,
  borderImageSource?: string,
  borderImageWidth?: string,
  borderInline?: string,
  borderInlineColor?: string,
  borderInlineEnd?: string,
  borderInlineEndColor?: string,
  borderInlineEndStyle?: CssBorderStyle,
  borderInlineEndWidth?: string,
  borderInlineStart?: string,
  borderInlineStartColor?: string,
  borderInlineStartStyle?: CssBorderStyle,
  borderInlineStartWidth?: string,
  borderInlineStyle?: CssBorderStyle,
  borderInlineWidth?: string,
  borderLeft?: string,
  borderLeftColor?: string,
  borderLeftStyle?: CssBorderStyle,
  borderLeftWidth?: string,
  borderRadius?: string,
  borderRight?: string,
  borderRightColor?: string,
  borderRightStyle?: CssBorderStyle,
  borderRightWidth?: string,
  borderSpacing?: string,
  borderStartEndRadius?: string,
  borderStartStartRadius?: string,
  borderStyle?: CssBorderStyle,
  borderTop?: string,
  borderTopColor?: string,
  borderTopLeftRadius?: string,
  borderTopRightRadius?: string,
  borderTopStyle?: CssBorderStyle,
  borderTopWidth?: string,
  borderWidth?: string,
  bottom?: string,
  boxDecorationBreak?: 'slice' | 'clone' | 'initial' | 'inherit',
  boxReflect?: 'none' | 'below' | 'above' | 'left' | 'right' | 'initial' | 'inherit' | string,
  boxShadow?: string,
  boxSizing?: 'content-box' | 'border-box' | 'initial' | 'inherit',
  breakAfter?: 'auto' | 'all' | 'always' | 'avoid' | 'avoid-column' | 'avoid-page' | 'avoid-region' | 'column' | 'left' | 'page' | 'recto' | 'region' | 'right' | 'verso' | 'initial' | 'inherit',
  breakBefore?: 'auto' | 'all' | 'always' | 'avoid' | 'avoid-column' | 'avoid-page' | 'avoid-region' | 'column' | 'left' | 'page' | 'recto' | 'region' | 'right' | 'verso' | 'initial' | 'inherit',
  breakInside?: 'auto' | 'avoid' | 'avoid-column' | 'avoid-page' | 'avoid-region' | 'initial' | 'inherit',
  captionSide?: 'top' | 'bottom' | 'initial' | 'inherit',
  caretColor?: string,
  clear?: 'none' | 'left' | 'right' | 'both' | 'initial' | 'inherit',
  clip?: string,
  clipPath?: string,
  color?: string,
  columnCount?: string,
  columnFill?: 'balance' | 'auto' | 'initial' | 'inherit',
  columnGap?: string,
  columnRule?: string,
  columnRuleColor?: string,
  columnRuleStyle?: CssBorderStyle,
  columnRuleWidth?: string,
  columnSpan?: 'none' | 'all' | 'initial' | 'inherit',
  columnWidth?: string,
  columns?: string,
  content?: string,
  counterIncrement?: string,
  counterReset?: string,
  counterSet?: string,
  cursor?: 'alias' | 'all-scroll' | 'auto' | 'cell' | 'col-resize' | 'context-menu' | 'copy' | 'crosshair' | 'default' | 'e-resize' | 'ew-resize' | 'grap' | 'grabbing' | 'help' | 'move' | 'n-resize' | 'ne-resize' | 'nesw-resize' | 'ns-resize' | 'nw-resize' | 'nwse-resize' | 'no-drop' | 'none' | 'not-allowed' | 'pointer' | 'progress' | 'row-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'text' | 'vertical-text' | 'w-resize' | 'wait' | 'zoom-in' | 'zoom-out' | 'initial' | 'inherit',
  direction?: 'ltr' | 'rtl' | 'initial' | 'inherit',
  display?: 'inline' | 'block' | 'contents' | 'flex' | 'grid' | 'inline-block' | 'inline-flex' | 'inline-grid' | 'inline-table' | 'list-item' | 'run-in' | 'table' | 'table-caption' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'table-cell' | 'table-column' | 'table-row' | 'none' | 'initial' | 'inherit',
  emptyCells?: 'show' | 'hide' | 'initial' | 'inherit',
  filter?: string,
  flex?: string,
  flexBasis?: string,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial' | 'inherit',
  flexFlow?: string,
  flexGrow?: string,
  flexShrink?: string,
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit',
  float?: 'none' | 'left' | 'right' | 'initial' | 'inherit',
  font?: string,
  fontFamily?: string,
  fontFeatureSettings?: string,
  fontKerning?: 'auto' | 'normal' | 'none',
  fontSize?: string,
  fontSizeAdjust?: string,
  fontStretch?: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | 'initial' | 'inherit',
  fontStyle?: 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit',
  fontVariant?: 'normal' | 'small-caps' | 'initial' | 'inherit',
  fontVariantCaps?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | 'initial' | 'inherit' | 'unset',
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'initial' | 'inherit',
  gap?: string,
  grid?: string,
  gridArea?: string,
  gridAutoColumns?: string,
  gridAutoFlow?: 'row' | 'column' | 'initial' | 'inherit' | string,
  gridAutoRows?: string,
  gridColumn?: string,
  gridColumnEnd?: string,
  gridColumnGap?: string,
  gridColumnStart?: string,
  gridGap?: string,
  gridRow?: string,
  gridRowEnd?: string,
  gridRowGap?: string,
  gridRowStart?: string,
  gridTemplate?: string,
  gridTemplateAreas?: string,
  gridTemplateColumns?: 'none' | 'auto' | 'max-content' | 'min-content' | 'initial' | 'inherit' | string,
  gridTemplateRows?: 'none' | 'auto' | 'max-content' | 'min-content' | string,
  hangingPunctuation?: 'none' | 'first' | 'last' | 'allow-end' | 'force-end' | 'initial' | 'inherit',
  height?: string,
  hyphens?: 'none' | 'manual' | 'auto' | 'initial' | 'inherit',
  hypenateCharacter?: 'auto' | 'string' | 'initial' | 'inherit',
  imageRendering?: 'auto' | 'smooth' | 'high-quality' | 'crisp-edges' | 'pixelated' | 'initial' | 'inherit',
  inlineSize?: string,
  inset?: string,
  insetBlock?: string,
  insetBlockEnd?: string,
  insetBlockStart?: string,
  insetInline?: string,
  insetInlineEnd?: string,
  insetInlineStart?: string,
  isolation?: 'auto' | 'isolate' | 'initial' | 'inherit',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit',
  justifyItems?: 'legacy' | 'normal' | 'stretch' | 'start' | 'left' | 'center' | 'end' | 'right' | 'overflow-alignment' | 'baseline alignment' | 'initial' | 'inherit',
  justifySelf?: 'auto' | 'normal' | 'stretch' | 'start' | 'left' | 'center' | 'end' | 'right' | 'overflow-alignment' | 'baseline alignment' | 'initial' | 'inherit',
  left?: string,
  letterSpacing?: string,
  lineHeight?: string,
  listStyle?: string,
  listStyleImage?: string,
  listStylePosition?: 'inside' | 'outside' | 'initial' | 'inherit',
  listStyleType?: 'disc' | 'armenian' | 'circle' | 'cjk-ideographic' | 'decimal' | 'decimal-leading-zero' | 'georgian' | 'hebrew' | 'hiragana' | 'hiragana-iroha' | 'katakana' | 'katakana-iroha' | 'lower-alpha' | 'lower-greek' | 'lower-latin' | 'lower-roman' | 'none' | 'square' | 'upper-alpha' | 'upper-greek' | 'upper-latin' | 'upper-roman' | 'initial' | 'inherit',
  margin?: string,
  marginBlock?: string,
  marginBlockEnd?: string,
  marginBlockStart?: string,
  marginBottom?: string,
  marginInline?: string,
  marginInlineEnd?: string,
  marginInlineStart?: string,
  marginLeft?: string,
  marginRight?: string,
  marginTop?: string,
  maskImage?: string,
  maskMode?: 'match-source' | 'luminance' | 'alpha' | 'initial' | 'inherit',
  maskOrigin?: 'border-box' | 'content-box' | 'padding-box' | 'margin-box	' | 'fill-box' | 'stroke-box' | 'view-box' | 'initial' | 'inherit',
  maskPosition?: string,
  maskRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'space' | 'round' | 'no-repeat' | 'initial' | 'inherit',
  maskSize?: string,
  maxHeight?: string,
  maxWidth?: string,
  maxBlockSize?: string,
  maxInlineSize?: string,
  minBlockSize?: string,
  minInlineSize?: string
  minHeight?: string,
  minWidth?: string,
  minBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity',
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | 'initial' | 'inherit',
  objectPosition?: string,
  offset?: string,
  offsetAnchor?: string,
  offsetDistance?: string,
  offsetPath?: string,
  offsetRotate?: string,
  opacity?: string,
  order?: string,
  orphans?: string,
  outline?: string,
  outlineColor?: string,
  outlineOffset?: string,
  outlineStyle?: CssBorderStyle,
  outlineWidth?: string,
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'initial' | 'inherit',
  overflowAnchor?: 'auto' | 'none' | 'initial' | 'inherit',
  overflowWrap?: 'normal' | 'anywhere' | 'break-word' | 'initial' | 'inherit',
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit',
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit',
  overscrollBehavior?: 'auto' | 'contain' | 'none' | 'initial' | 'inherit',
  overscrollBehaviorBlock	?: 'auto' | 'contain' | 'none' | 'initial' | 'inherit',
  overscrollBehaviorInline?: 'auto' | 'contain' | 'none' | 'initial' | 'inherit',
  overscrollBehaviorX?: 'auto' | 'contain' | 'none' | 'initial' | 'inherit',
  overscrollBehaviorY?: 'auto' | 'contain' | 'none' | 'initial' | 'inherit',
  padding?: string,
  paddingBlock?: string,
  paddingBlockEnd?: string,
  paddingBlockStart?: string,
  paddingBottom?: string,
  paddingInline?: string,
  paddingInlineEnd?: string,
  paddingInlineStart?: string,
  paddingLeft?: string,
  paddingRight?: string,
  paddingTop?: string,
  pageBreakAfter?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'initial' | 'inherit',
  pageBreakBefore?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'initial' | 'inherit',
  pageBreakInside?: 'auto' | 'avoid' | 'initial' | 'inherit',
  paintOrder?: string,
  perspective?: string,
  perspectiveOrigin?: string,
  placeContent?: 'normal' | 'stretch' | 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'overflow-alignment' | 'initial' | 'inherit',
  placeItems?: 'normal legacy' | 'baseline' | 'center' | 'end' | 'start' | 'stretch' | 'initial' | 'inherit',
  placeSelf?: 'auto' | 'normal' | 'stretch' | 'start' | 'left' | 'center' | 'end' | 'right' | 'overflow-alignment' | 'baseline alignment' | 'initial' | 'inherit',
  pointerEvents?: 'auto' | 'none' | 'initial' | 'inherit',
  position?: 'static' | 'absolute' | 'fixed' | 'relative' | 'sticky' | 'initial' | 'inherit',
  quotes?: string,
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit',
  right?: string,
  rotate?: string,
  rowGap?: string,
  scale?: string,
  scrollBehavior?: 'auto' | 'smooth' | 'initial' | 'inherit',
  scrollMargin?: string,
  scrollMarginBlock?: string,
  scrollMarginBlockEnd?: string,
  scrollMarginBlockStart?: string,
  scrollMarginBottom?: string,
  scrollMarginInline?: string,
  scrollMarginInlineEnd?: string,
  scrollMarginInlineStart?: string,
  scrollMarginLeft?: string,
  scrollMarginRight?: string,
  scrollMarginTop?: string,
  scrollPadding?: string,
  scrollPaddingBlock?: string,
  scrollPaddingBlockEnd?: string,
  scrollPaddingBlockStart?: string,
  scrollPaddingBottom?: string,
  scrollPaddingInline?: string,
  scrollPaddingInlineEnd?: string,
  scrollPaddingInlineStart?: string,
  scrollPaddingLeft?: string,
  scrollPaddingRight?: string,
  scrollPaddingTop?: string,
  scrollSnapAlign?: 'none' | 'start' | 'end' | 'center' | 'block inline' | 'initial' | 'inherit',
  scrollSnapStop?: 'none' | 'x' | 'y' | 'block' | 'inline' | 'both' | 'mandatory' | 'proximity' | 'initial' | 'inherit' | string,
  scrollSnapType?: 'none' | 'x' | 'y' | 'block' | 'inline' | 'both' | 'mandatory' | 'proximity' | 'initial' | 'inherit' | string,
  scrollbarColor?: string,
  tabSize?: string,
  tableLayout?: 'auto' | 'fixed' | 'initial' | 'inherit',
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit',
  textAlignLast?: 'auto' | 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | 'initial' | 'inherit',
  textDecoration?: string,
  textDecorationColor?: string,
  textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through' | 'initial' | 'inherit',
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | 'initial' | 'inherit',
  textDecorationThickness?: string,
  textEmphasis?: string,
  textEmphasisColor?: string,
  textEmphasisPosition?: string,
  textEmphasisStyle?: 'none' | 'filled' | 'open' | 'dot' | 'circle' | 'double-circle' | 'triangle' | 'sesame' | 'initial' | 'inherit' | string,
  textIndent?: string
  textJustify?: 'auto' | 'inter-word' | 'inter-character' | 'none' | 'initial' | 'inherit',
  textOrientation?: 'mixed' | 'upright' | 'sideways' | 'sideways-right' | 'use-glyph-orientation' | 'initial' | 'inherit',
  textOverflow?: 'clip' | 'ellipsis' | 'initial' | 'inherit',
  textShadow?: string,
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit',
  textUnderlineOffset?: string,
  textUnderlinePosition?: 'auto' | 'under' | 'left' | 'right' | 'initial' | 'inherit',
  top?: string,
  transform?: string,
  transformOrigin?: string,
  transformStyle?: string,
  transition?: string,
  transitionDelay?: string,
  transitionDuration?: string,
  transitionProperty?: string,
  transitionTimingFunction?: 'ease' | 'linear' | 'ease-in' | 'ease-out'  | 'ease-in-out' | 'step-start' | 'step-end' | 'initial' | 'inherit',
  translate?: string,
  unicodeBidi?: 'normal' | 'embed' | 'bidi-override' | 'isolate' | 'isolate-override' | 'plaintext' | 'initial' | 'inherit',
  userSelect?: 'auto' | 'none' | 'text' | 'all',
  verticalAlign?: 'baseline' | 'sub' | 'super' | 'top' | 'text-top' | 'middle' | 'bottom' | 'text-bottom' | 'initial' | 'inherit',
  visibility?: 'visible' | 'hidden' | 'collapse' | 'initial' | 'inherit',
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line'| 'pre-wrap' | 'initial' | 'inherit',
  widows?: string,
  width?: string,
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word' | 'initial' | 'inherit',
  wordSpacing?: string,
  wordWrap?: 'normal' | 'break-word' | 'initial' | 'inherit',
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr',
  zIndex?: string

  [key: string]: undefined | string
}

type CssBorderStyle = 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'initial' | 'inherit' | string

export { createStyle, applySpecialProperties, parseStyle, CssProperties }

const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
