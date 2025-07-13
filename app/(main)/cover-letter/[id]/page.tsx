const CoverLetter = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  return <div className="">Cover Letter -{id}</div>;
};

export default CoverLetter;
