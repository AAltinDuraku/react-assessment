import styled from 'styled-components';

const StyledButton = styled.button<{ isDelete?: boolean }>`
  background-color: ${({ isDelete }) => (isDelete ? '#e74c3c' : '#3498db')};
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ isDelete }) => (isDelete ? '#c0392b' : '#2980b9')};
  }
`;

export default StyledButton;