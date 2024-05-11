import useWS, { WsStatus } from "../useWS";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react-native";
import WS from "jest-websocket-mock";

const url = "ws://localhost:8080";
let ws: WS;

describe("useWS", () => {
  beforeEach(() => {
    ws = new WS(url);
  });

  afterEach(() => {
    WS.clean();
  });

  it("should open a WebSocket connection", async () => {
    const { result } = renderHook(() => useWS({ url }));
    await act(async () => {
      await ws.connected;
    });
    expect(result.current.status).toBe(WsStatus.OPEN);
  });
  it("should call onOpen callback when WebSocket connection is opened", async () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => useWS({ url, onOpen }));
    await act(async () => {
      await ws.connected;
    });
    expect(result.current.status).toBe(WsStatus.OPEN);
    expect(onOpen).toHaveBeenCalled();
  });

  it("should call onMessage callback when a message is received", async () => {
    const onMessage = jest.fn();
    const { result } = renderHook(() => useWS({ url, onMessage }));
    await act(async () => {
      await ws.connected;
    });

    const message = JSON.stringify({ message: "Hello" });
    act(() => ws.server.emit("message", message));
    await waitFor(() => expect(result.current.status).toBe(WsStatus.OPEN));
    expect(onMessage).toHaveBeenCalledWith(message, expect.any(Object));
  });

  it("should call onClose callback when WebSocket connection is closed", async () => {
    const onClose = jest.fn();
    const { result } = renderHook(() => useWS({ url, onClose }));
    await act(async () => {
      await ws.connected;
    });
    act(() => ws.server.emit("close", "Close"));
    await waitFor(() => expect(result.current.status).toBe(WsStatus.CLOSED));
    expect(onClose).toHaveBeenCalled();
  });

  it("should call onError callback when an error occurs", async () => {
    const onError = jest.fn();
    const { result } = renderHook(() => useWS({ url, onError }));
    await act(async () => {
      await ws.connected;
    });
    act(() => ws.server.emit("error", "Close"));
    await waitFor(() => expect(result.current.status).toBe(WsStatus.CLOSING));
    expect(onError).toHaveBeenCalled();
  });

  it("should send string message", async () => {
    const { result } = renderHook(() => useWS({ url }));
    await act(async () => {
      await ws.connected;
    });
    const message = JSON.stringify("Hello");
    act(() => result.current.sendMessage(message));
    await waitFor(() => expect(result.current.status).toBe(WsStatus.OPEN));
    expect(ws).toReceiveMessage(message);
  });
  it("should send json message", async () => {
    const { result, waitForNextUpdate, waitForValueToChange } = renderHook(() =>
      useWS({ url })
    );

    await act(async () => {
      await ws.connected;
    });
    const message = JSON.stringify({ message: "Hello" });
    act(() => result.current.sendMessage(message));
    await waitFor(() => expect(result.current.status).toBe(WsStatus.OPEN));
    expect(ws).toReceiveMessage(message);
  });
});
