function MutualAidForm() {
  return (
    <form>
      <h2>I am tending to...</h2>
      <textarea
        placeholder="Describe what you're tending to..."
        rows="4"
        cols="50"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MutualAidForm;