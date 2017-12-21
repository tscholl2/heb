export interface ISample {
  name: string;
  render(root: HTMLElement): void;
}

const samples: Array<ISample> = [];

export function addSample(name: ISample["name"], render: ISample["render"]) {
  samples.push({ name, render });
}

export function getSamples() {
  return samples;
}
