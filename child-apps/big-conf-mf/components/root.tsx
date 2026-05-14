import React from 'react';
import styles from './root.module.css';

// Типы для конфига
type ColorStyle = 'outline' | 'color' | 'shadow' | 'custom';
type Size = 's' | 'm' | 'l';
type ImagePosition = 'left' | 'right';
type TitleSize = 's' | 'l';
type HtmlTag =
  | 'div'
  | 'b'
  | 'strong'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'a'
  | 'button';
type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outlineDark'
  | 'outlineLight'
  | 'textLink'
  | 'custom';
type ButtonAction =
  | 'goToLink'
  | 'goToBlock'
  | 'showBlock'
  | 'crossSale'
  | 'callFormEvent';
type ImageAlign = 'top' | 'center' | 'bottom';

interface ImageSrcset {
  src: string;
  condition: string;
}

interface ImageConfig {
  src: string;
  srcset?: ImageSrcset[];
  webpSrcset?: ImageSrcset[];
}

interface ButtonOnClick {
  action: ButtonAction;
  nofollow?: boolean;
  url?: string;
  targetBlank?: boolean;
  title?: string;
  noindex?: boolean;
  guid?: string;
  guidList?: { guid: string }[];
  formId?: string;
  crossSaleUrl?: string;
  eventName?: string;
}

interface ButtonConfig {
  active: boolean;
  text: string;
  color: {
    style: ButtonStyle;
    backgroundColor?: string;
  };
  onClick?: ButtonOnClick;
  htmlTag?: HtmlTag;
}

interface ImageBlockConfig {
  alt: string;
  title: string;
  image: ImageConfig;
  imageAlign: ImageAlign;
}

interface TitleConfig {
  text: string;
  size: TitleSize;
  htmlTag?: HtmlTag;
}

interface DescriptionConfig {
  text: string;
  htmlTag?: HtmlTag;
}

interface PanelProps {
  color: {
    style: ColorStyle;
    background?: string;
  };
  size: Size;
  imagePosition: ImagePosition;
  title: TitleConfig;
  description: DescriptionConfig;
  image: ImageBlockConfig;
  button: ButtonConfig;
  href?: string;
}

interface BigConfMfProps {
  background?: string;
  panel?: PanelProps;
}

export function getPanelStyleClass(style: ColorStyle): string {
  switch (style) {
    case 'outline':
      return styles.panelOutline;
    case 'color':
      return styles.panelColor;
    case 'shadow':
      return styles.panelShadow;
    case 'custom':
      return styles.panelCustom;
    default:
      return '';
  }
}

export function getSizeClass(size: Size): string {
  switch (size) {
    case 's':
      return styles.panelS;
    case 'm':
      return styles.panelM;
    case 'l':
      return styles.panelL;
    default:
      return '';
  }
}

export function getImagePositionClass(position: ImagePosition): string {
  switch (position) {
    case 'left':
      return styles.imageLeft;
    case 'right':
      return styles.imageRight;
    default:
      return '';
  }
}

function getTitleSizeClass(size: TitleSize): string {
  switch (size) {
    case 's':
      return styles.titleS;
    case 'l':
      return styles.titleL;
    default:
      return '';
  }
}

function getButtonStyleClass(style: ButtonStyle, active: boolean): string {
  const baseClass = styles.button;
  let styleClass = '';

  switch (style) {
    case 'primary':
      styleClass = styles.buttonPrimary;
      break;
    case 'secondary':
      styleClass = styles.buttonSecondary;
      break;
    case 'outline':
      styleClass = styles.buttonOutline;
      break;
    case 'outlineDark':
      styleClass = styles.buttonOutlineDark;
      break;
    case 'outlineLight':
      styleClass = styles.buttonOutlineLight;
      break;
    case 'textLink':
      styleClass = styles.buttonTextLink;
      break;
    case 'custom':
      styleClass = styles.buttonCustom;
      break;
  }

  if (!active) {
    return `${baseClass} ${styleClass} ${styles.buttonInactive}`;
  }

  return `${baseClass} ${styleClass}`;
}

function getImageAlignClass(align: ImageAlign): string {
  switch (align) {
    case 'top':
      return styles.imageTop;
    case 'center':
      return styles.imageCenter;
    case 'bottom':
      return styles.imageBottom;
    default:
      return '';
  }
}

function renderHtmlTag(
  tag: HtmlTag | undefined,
  content: React.ReactNode,
  className?: string
): React.ReactNode {
  const Tag = (tag || 'div') as
    | 'div'
    | 'b'
    | 'strong'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';
  return <Tag className={className}>{content}</Tag>;
}

function buildSrcSet(
  srcset: ImageSrcset[] | undefined,
): string {
  if (!srcset || srcset.length === 0) return '';
  return srcset.map((item) => `${item.src} ${item.condition}`).join(', ');
}

function handleButtonAction(
  action: ButtonAction,
  url: string | undefined,
  targetBlank: boolean | undefined,
  eventName: string | undefined
): void {
  switch (action) {
    case 'goToLink':
    case 'crossSale':
      if (url) {
        window.open(url, targetBlank ? '_blank' : '_self');
      }
      break;
    case 'goToBlock':
    case 'showBlock':
      if (url) {
        const element = document.querySelector(url);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      break;
    case 'callFormEvent':
      if (eventName) {
        console.log('Form event triggered:', eventName);
      }
      break;
    default:
      console.log('Button clicked with action:', action);
  }
}

function isLinkButton(
  href: string | undefined,
  onClick: ButtonOnClick | undefined
): boolean {
  return !!(
    href ||
    (onClick &&
      (onClick.action === 'goToLink' ||
        onClick.action === 'crossSale'))
  );
}

function getRelAttribute(onClick: ButtonOnClick | undefined): string | undefined {
  if (!onClick) return undefined;
  
  if (onClick.targetBlank) {
    return 'noreferrer noopener';
  }
  if (onClick.nofollow || onClick.noindex) {
    return 'nofollow noindex';
  }
  return undefined;
}

function renderLinkButton(
  href: string | undefined,
  buttonClasses: string,
  buttonStyle: React.CSSProperties,
  onClick: ButtonOnClick | undefined,
  handleButtonClick: () => void,
  buttonText: string
): React.ReactNode {
  return (
    <a
      href={href || onClick?.url || '#'}
      className={buttonClasses}
      style={buttonStyle}
      target={onClick?.targetBlank ? '_blank' : undefined}
      rel={getRelAttribute(onClick)}
      title={onClick?.title}
      onClick={(e) => {
        e.preventDefault();
        handleButtonClick();
      }}
    >
      {buttonText}
    </a>
  );
}

function renderRegularButton(
  buttonClasses: string,
  buttonStyle: React.CSSProperties,
  handleButtonClick: () => void,
  buttonText: string,
  active: boolean
): React.ReactNode {
  return (
    <button
      type="button"
      className={buttonClasses}
      style={buttonStyle}
      onClick={handleButtonClick}
      disabled={!active}
    >
      {buttonText}
    </button>
  );
}

function getPanelClasses(panel: PanelProps): string {
  const { color, size, imagePosition } = panel;
  return [
    styles.panel,
    getPanelStyleClass(color.style),
    getSizeClass(size),
    getImagePositionClass(imagePosition),
  ]
    .filter(Boolean)
    .join(' ');
}

function getPanelStyle(panel: PanelProps): React.CSSProperties | undefined {
  return panel.color.background
    ? { backgroundColor: panel.color.background }
    : {};
}

function renderTitle(title: TitleConfig): React.ReactNode {
  return (
    <div className={styles.title}>
      {renderHtmlTag(
        title.htmlTag,
        title.text,
        getTitleSizeClass(title.size)
      )}
    </div>
  );
}

function renderImage(image: ImageBlockConfig): React.ReactNode {
  const { image: imageConfig, alt, title: imageTitle, imageAlign } = image;
  
  if (!imageConfig || !imageConfig.src) {
    return null;
  }

  const imageAlignClass = getImageAlignClass(imageAlign);

  return (
    <div className={`${styles.imageContainer} ${imageAlignClass}`}>
      <picture>
        {imageConfig.webpSrcset && imageConfig.webpSrcset.length > 0 && (
          <source
            type="image/webp"
            srcSet={buildSrcSet(imageConfig.webpSrcset)}
          />
        )}
        {imageConfig.srcset && imageConfig.srcset.length > 0 && (
          <source
            type="image/png"
            srcSet={buildSrcSet(imageConfig.srcset)}
          />
        )}
        <img
          src={imageConfig.src}
          alt={alt}
          title={imageTitle}
          className={styles.image}
        />
      </picture>
      {alt && <p className={styles.imageAlt}>{alt}</p>}
    </div>
  );
}

function renderDescription(description: DescriptionConfig): React.ReactNode {
  return (
    <div className={styles.description}>
      {renderHtmlTag(description.htmlTag, description.text)}
    </div>
  );
}

function createButtonClickHandler(
  onClick: ButtonOnClick | undefined,
  handleButtonAction: (
    action: ButtonAction,
    url: string | undefined,
    targetBlank: boolean | undefined,
    eventName: string | undefined
  ) => void
): () => void {
  return () => {
    if (!onClick) return;
    const { action, url, targetBlank, eventName } = onClick;
    handleButtonAction(action, url, targetBlank, eventName);
  };
}

function renderButton(
  button: ButtonConfig,
  href: string | undefined,
  buttonClasses: string,
  buttonStyle: React.CSSProperties
): React.ReactNode {
  const handleButtonClick = createButtonClickHandler(
    button.onClick,
    handleButtonAction
  );

  if (isLinkButton(href, button.onClick)) {
    return renderLinkButton(
      href,
      buttonClasses,
      buttonStyle,
      button.onClick,
      handleButtonClick,
      button.text
    );
  }

  return renderRegularButton(
    buttonClasses,
    buttonStyle,
    handleButtonClick,
    button.text,
    button.active
  );
}

function renderEmptyPanel(containerStyle: React.CSSProperties): React.ReactNode {
  return (
    <div className={styles.container} style={containerStyle}>
      <p>Панель не настроена</p>
    </div>
  );
}

function renderPanelContent(panel: PanelProps): React.ReactNode {
  const { title, description, image, button, href } = panel;

  const buttonClasses = getButtonStyleClass(button.color.style, button.active);
  const buttonStyle = button.color.backgroundColor
    ? { backgroundColor: button.color.backgroundColor }
    : {};

  return (
    <>
      {title && renderTitle(title)}
      {image && image.image && image.image.src && renderImage(image)}
      {description && renderDescription(description)}
      {button && button.text && renderButton(button, href, buttonClasses, buttonStyle)}
    </>
  );
}

function renderPanel(panel: PanelProps, containerStyle: React.CSSProperties): React.ReactNode {
  const panelClasses = getPanelClasses(panel);
  const panelStyle = getPanelStyle(panel);

  return (
    <div className={styles.container} style={containerStyle}>
      <div className={panelClasses} style={panelStyle}>
        <div className={styles.panelContent}>
          {renderPanelContent(panel)}
        </div>
      </div>
    </div>
  );
}

export function BigConfMf({ background, panel }: BigConfMfProps): React.ReactNode {
  const containerStyle = background ? { backgroundColor: background } : {};

  if (!panel) {
    return renderEmptyPanel(containerStyle);
  }

  return renderPanel(panel, containerStyle);
}
