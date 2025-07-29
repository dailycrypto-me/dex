import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { RowBetween } from '../Row';
import { ChevronDown } from 'react-feather';
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components';

const Base = styled(RebassButton)<{
  padding?: string;
  width?: string;
  borderRadius?: string;
  altDisabledStyle?: boolean;
}>`
  padding: ${({ padding }) => (padding ? padding : '18px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: 500;
  text-align: center;
  border-radius: 20px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: 0.25s;

  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`;

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.primary1};
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle, disabled }) =>
      altDisabledStyle ? (disabled ? theme.bg3 : theme.primary1) : theme.bg3};
    color: ${({ theme, altDisabledStyle, disabled }) =>
      altDisabledStyle ? (disabled ? theme.text3 : 'white') : theme.text3};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.5' : '1')};
  }
`;

export const ButtonSecondary = styled(Base)`
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`;

export const ButtonOutlined = styled(Base)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.text1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${({ theme }) => lighten(0.5, theme.green1)};
  color: ${({ theme }) => theme.green1};
  border: 1px solid ${({ theme }) => theme.green1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;

const ButtonErrorStyle = styled(Base)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`;

export const ClaimButton = styled(ButtonSecondary)`
    width: 240px;
    background: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.text1};
    border: 1px solid ${({ theme }) => theme.bg3};
    
    box-shadow: ${({theme}) => theme.shadow2};
    height:36px;
    :hover,
    :active,
    :focus {
      background-color: ${({ theme }) => lighten(0.05, theme.bg3)};
      border: 1px solid ${({ theme }) => darken(0.1, theme.bg3)};
      box-shadow: ${({theme}) => theme.shadow2};
      :focus {
        border: 1px solid ${({ theme }) => darken(0.1, theme.bg3)};
        box-shadow: ${({theme}) => theme.shadow2};
      }
    }
    @media only screen and (max-width: 648px) {
      width: auto;
    }
`;

const StyledClaimSVG = styled.svg`
  & path {
    fill: ${({ theme }) => theme.text1};
  }
  height: 20px;
  width: 20px;
  margin-right: 5px;
  @media only screen and (max-width: 648px) {
    margin-right: 0px;
  }
`;

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />;
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />;
  }
}

export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />;
  } else {
    return <ButtonPrimary {...rest} />;
  }
}

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonPrimary>
  );
}

export function ButtonDropdownLight({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonOutlined {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonOutlined>
  );
}

export function ClaimIcon() {
  return (
    <StyledClaimSVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1875 0.829102C12.8342 0.829102 13.3584 1.35334 13.3584 2.00003V11.9352L14.7544 10.5392C15.2117 10.082 15.9531 10.082 16.4104 10.5392C16.8676 10.9965 16.8676 11.7379 16.4104 12.1952L13.0147 15.5909C12.5574 16.0481 11.816 16.0481 11.3588 15.5909L7.96307 12.1952C7.5058 11.7379 7.5058 10.9965 7.96307 10.5392C8.42035 10.082 9.16174 10.082 9.61901 10.5392L11.0166 11.9368V2.00003C11.0166 1.35334 11.5408 0.829102 12.1875 0.829102ZM5.81195 4.5238C6.26922 4.06652 6.26922 3.32513 5.81195 2.86786C5.35467 2.41058 4.61329 2.41058 4.15601 2.86786C-0.279869 7.30374 -0.279869 14.4947 4.15601 18.9305C8.59189 23.3664 15.7828 23.3664 20.2187 18.9305C24.6546 14.4947 24.6546 7.30374 20.2187 2.86786C19.7614 2.41058 19.02 2.41058 18.5628 2.86786C18.1055 3.32513 18.1055 4.06652 18.5628 4.5238C22.0841 8.04513 22.0841 13.7533 18.5628 17.2746C15.0414 20.7959 9.33328 20.7959 5.81195 17.2746C2.29062 13.7533 2.29062 8.04513 5.81195 4.5238Z"
      />
    </StyledClaimSVG>
  );
}
