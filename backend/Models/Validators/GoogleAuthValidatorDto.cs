using FluentValidation;

namespace Find_H_er.Models.Validators
{
    public class GoogleAuthValidatorDto : AbstractValidator<GoogleAuthDto>
    {
        public GoogleAuthValidatorDto()
        {
            RuleFor(x => x.Email)
                .EmailAddress()
                .NotEmpty();
            RuleFor(x => x.Name)
                .NotEmpty();
        }
    }
}
