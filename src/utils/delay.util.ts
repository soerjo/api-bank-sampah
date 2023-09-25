const delay = (ms: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => res(), ms);
  });
};

export default delay;
