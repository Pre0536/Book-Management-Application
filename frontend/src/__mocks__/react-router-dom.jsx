jest.mock('react-router-dom');

export const useNavigate = () => jest.fn();
export const Link = ({ children }) => <div>{children}</div>;