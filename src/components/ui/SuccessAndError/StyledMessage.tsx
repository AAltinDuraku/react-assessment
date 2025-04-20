import styled from "styled-components";

export const MessageContainer = styled.div<{ type: "success" | "error" }>`
  position: absolute;
  width: 300px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;
  left: calc(50% - 150px);
  background-color: ${({ type }) =>
    type === "success" ? "#d4edda" : "#f8d7da"};
  color: ${({ type }) => (type === "success" ? "#155724" : "#721c24")};
  border: 1px solid
    ${({ type }) => (type === "success" ? "#c3e6cb" : "#f5c6cb")};
  margin: 10px 0;

  .icon {
    margin-right: 10px;
  }

  .text {
    flex: 1;
  }
`;
export const MessageText = styled.div`
  display: flex;
  justify-content: space-between;
`;
