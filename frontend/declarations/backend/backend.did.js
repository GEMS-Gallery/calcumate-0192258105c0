export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Float64, 'err' : IDL.Text });
  return IDL.Service({
    'add' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
    'divide' : IDL.Func([IDL.Float64, IDL.Float64], [Result], []),
    'multiply' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
    'subtract' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
  });
};
export const init = ({ IDL }) => { return []; };
