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

function getPanelStyleClass(style: ColorStyle): string {
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

function getSizeClass(size: Size): string {
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

function getImagePositionClass(position: ImagePosition): string {
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
  srcset: ImageSrcset[] | undefined
  // _type parameter intentionally unused - kept for API compatibility
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

function renderLinkButton(
  ButtonTag: 'button' | 'a' | 'div',
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
      rel={(() => {
        if (onClick?.targetBlank) {
          return 'noreferrer noopener';
        }
        if (onClick?.nofollow || onClick?.noindex) {
          return 'nofollow noindex';
        }
        return undefined;
      })()}
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

export function BigConfMf({ background, panel }: BigConfMfProps) {
  const containerStyle = background ? { backgroundColor: background } : {};

  if (!panel) {
    return (
      <div className={styles.container} style={containerStyle}>
        <p>Панель не настроена</p>
      </div>
    );
  }

  const {
    color,
    size,
    imagePosition,
    title,
    description,
    image,
    button,
    href,
  } = panel;

  const panelClasses = [
    styles.panel,
    getPanelStyleClass(color.style),
    getSizeClass(size),
    getImagePositionClass(imagePosition),
  ]
    .filter(Boolean)
    .join(' ');

  const panelStyle = color.background
    ? { backgroundColor: color.background }
    : {};

  const imageAlignClass = getImageAlignClass(image.imageAlign);

  const buttonClasses = getButtonStyleClass(button.color.style, button.active);

  const buttonStyle = button.color.backgroundColor
    ? { backgroundColor: button.color.backgroundColor }
    : {};

  const handleButtonClick = () => {
    if (!button.onClick) return;
    
    const { action, url, targetBlank, eventName } = button.onClick;
    handleButtonAction(action, url, targetBlank, eventName);
  };

  const renderButton = () => {
    const ButtonTag = (button.htmlTag || 'button') as 'button' | 'a' | 'div';
    const isLinkAction = isLinkButton(href, button.onClick);

    if (isLinkAction) {
      return renderLinkButton(ButtonTag, href, buttonClasses, buttonStyle, button.onClick, handleButtonClick, button.text);
    }

    return (
      <ButtonTag
        type="button"
        className={buttonClasses}
        style={buttonStyle}
        onClick={handleButtonClick}
        disabled={!button.active}
      >
        {button.text}
      </ButtonTag>
    );
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {/* Panel Card */}
      <div className={panelClasses} style={panelStyle}>
        <div className={styles.panelContent}>
          {/* Image */}
          {image && image.image && image.image.src && (
            <div className={`${styles.imageContainer} ${imageAlignClass}`}>
              <picture>
                {image.image.webpSrcset &&
                  image.image.webpSrcset.length > 0 && (
                    <source
                      type="image/webp"
                      srcSet={buildSrcSet(image.image.webpSrcset, 'webp')}
                    />
                  )}
                {image.image.srcset && image.image.srcset.length > 0 && (
                  <source
                    type="image/png"
                    srcSet={buildSrcSet(image.image.srcset, 'src')}
                  />
                )}
                <img
                  src={image.image.src}
                  alt={image.alt}
                  title={image.title}
                  className={styles.image}
                />
              </picture>
              {image.alt && <p className={styles.imageAlt}>{image.alt}</p>}
            </div>
          )}

          {/* Title */}
          {title && (
            <div className={styles.title}>
              {renderHtmlTag(
                title.htmlTag,
                title.text,
                getTitleSizeClass(title.size)
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <div className={styles.description}>
              {renderHtmlTag(description.htmlTag, description.text)}
            </div>
          )}

          {/* Button */}
          {button && button.text && renderButton()}
        </div>
      </div>
    </div>
  );
}
