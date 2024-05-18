import styled from "styled-components/native";

export const Container = styled.View<{ spaceTop: number }>`
  padding: ${({ theme }) => theme.spacings.md};
  padding-top: ${({ spaceTop, theme }) =>
    `${spaceTop + parseInt(theme.spacings.md, 2)}px`};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Avatar = styled.Image.attrs({
  resizeMode: "cover",
})`
  border-radius: 20px;
  width: 40px;
  height: 40px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.sizes.lg};
`;

export const CoinContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CoinIcon = styled.Image`
  margin-right: ${({ theme }) => theme.spacings.sm};
  border-radius: 15px;
  width: 30px;
  height: 30px;
`;
